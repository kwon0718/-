const c=document.querySelector("#heroCanvas"),x=c.getContext("2d");let ps=[],m={x:-1e4,y:-1e4};function size(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}size();addEventListener("resize",size);for(let i=0;i<Math.min(90,innerWidth/14);i++)ps.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.4+.3});addEventListener("mousemove",e=>{m.x=e.clientX;m.y=e.clientY});function loop(){x.clearRect(0,0,innerWidth,innerHeight);ps.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;let d=Math.hypot(m.x-p.x,m.y-p.y);if(d<160){p.x-=(m.x-p.x)*.001;p.y-=(m.y-p.y)*.001}x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fillStyle="#c8ff3866";x.fill();for(let j=i+1;j<ps.length;j++){let q=ps[j],z=Math.hypot(p.x-q.x,p.y-q.y);if(z<105){x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.strokeStyle="rgba(255,255,255,"+((1-z/105)*.08)+")";x.stroke()}}});requestAnimationFrame(loop)}loop();const ob=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>ob.observe(e));document.querySelectorAll("a[href^='#']").forEach(a=>a.addEventListener("click",()=>window.setTimeout(()=>history.replaceState(null,"",a.getAttribute("href")),0)));

const commentForm=document.querySelector("#commentForm");
const commentList=document.querySelector("#commentList");
const commentStatus=document.querySelector("#commentStatus");
const commentCount=document.querySelector("#commentCount");
let commentClient=null;

function showCommentStatus(message,isError=false){
  if(!commentStatus)return;
  commentStatus.textContent=message;
  commentStatus.classList.toggle("error",isError);
}
function formatCommentDate(value){
  const date=new Date(value);
  if(Number.isNaN(date.getTime()))return "";
  return new Intl.DateTimeFormat("ko-KR",{dateStyle:"medium",timeStyle:"short"}).format(date);
}
function renderComments(rows){
  commentList.replaceChildren();
  commentCount.textContent=rows.length+"개";
  if(!rows.length){
    const empty=document.createElement("p");
    empty.className="comment-empty";
    empty.textContent="아직 등록된 댓글이 없습니다. 첫 댓글을 남겨주세요.";
    commentList.append(empty);
    return;
  }
  rows.forEach(row=>{
    const article=document.createElement("article");
    article.className="comment-item";
    const meta=document.createElement("div");
    meta.className="comment-meta";
    const author=document.createElement("strong");
    author.textContent="방문자";
    const date=document.createElement("time");
    date.dateTime=row.created_at;
    date.textContent=formatCommentDate(row.created_at);
    const body=document.createElement("p");
    body.textContent=row.message;
    meta.append(author,date);
    article.append(meta,body);
    commentList.append(article);
  });
}
async function loadComments(){
  if(!commentClient){
    commentCount.textContent="연결 대기";
    commentList.innerHTML='<p class="comment-empty">댓글 DB 연결 설정이 필요합니다.</p>';
    return;
  }
  const {data,error}=await commentClient.from("site_comments").select("id,message,created_at").order("created_at",{ascending:false}).limit(50);
  if(error){
    console.error("댓글 조회 오류:",error);
    commentCount.textContent="조회 실패";
    commentList.innerHTML='<p class="comment-empty">댓글을 불러오지 못했습니다. DB 설정을 확인해주세요.</p>';
    return;
  }
  renderComments(data||[]);
}
if(commentForm){
  const button=commentForm.querySelector('button[type="submit"]');
  const messageInput=document.querySelector("#commentMessage");
  const honeypot=document.querySelector("#commentWebsite");
  if(window.supabase&&window.supabaseConfig&&window.supabaseConfig.url&&window.supabaseConfig.anonKey&&!window.supabaseConfig.url.includes("YOUR_")&&!window.supabaseConfig.anonKey.includes("YOUR_")){
    commentClient=window.supabase.createClient(window.supabaseConfig.url,window.supabaseConfig.anonKey);
    loadComments();
  }else{
    commentCount.textContent="연결 대기";
    commentList.innerHTML='<p class="comment-empty">댓글 DB 연결 설정이 필요합니다.</p>';
  }
  commentForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const message=messageInput.value.trim();
    if(honeypot.value)return;
    if(!message){showCommentStatus("댓글 내용을 입력해주세요.",true);return;}
    if(message.length>1000){showCommentStatus("댓글은 1,000자 이내로 작성해주세요.",true);return;}
    if(!commentClient){showCommentStatus("아직 DB 연결이 완료되지 않았습니다. 관리자에게 문의해주세요.",true);return;}
    button.disabled=true;
    showCommentStatus("댓글을 등록하고 있습니다.");
    try{
      const {error}=await commentClient.from("site_comments").insert({message});
      if(error)throw error;
      commentForm.reset();
      showCommentStatus("댓글이 등록되었습니다. 감사합니다!");
      await loadComments();
    }catch(error){
      console.error("댓글 등록 오류:",error);
      showCommentStatus("등록에 실패했습니다. 잠시 후 다시 시도해주세요.",true);
    }finally{button.disabled=false;}
  });
}
const cp=new URLSearchParams(location.search);const problem=cp.get("problem"),service=cp.get("service"),priority=cp.get("priority");if(problem){const commentInput=document.querySelector("#commentMessage");if(commentInput)commentInput.placeholder="진단 결과에 대한 의견이나 질문을 남겨주세요.";}
