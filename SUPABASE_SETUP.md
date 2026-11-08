# 댓글 게시판 DB 연결 설정

사이트의 문의 영역은 이메일 전송 폼이 아니라 짧은 댓글을 등록하고 공개 목록으로 보여주는 게시판으로 변경되었습니다.

## 1. Supabase 프로젝트 준비
1. https://supabase.com 에서 로그인하고 프로젝트를 만듭니다.
2. Supabase 대시보드의 SQL Editor에서 `supabase/site_comments.sql` 파일 전체를 복사해 실행합니다.
3. Project Settings > API Keys에서 Project URL과 Publishable key(또는 legacy anon key)를 복사합니다.

## 2. 사이트 연결
저장소의 `supabase-config.js` 파일에서 아래 두 값을 실제 프로젝트 값으로 바꿉니다.
- `YOUR_SUPABASE_PROJECT_URL`
- `YOUR_SUPABASE_PUBLISHABLE_KEY`

GitHub Pages 배포가 완료되면 사이트의 댓글 영역에서 댓글 등록과 목록 조회를 테스트합니다.

## 3. 동작 방식
- 댓글은 최대 1,000자입니다.
- 이름이나 이메일 없이 댓글 내용만 입력하면 됩니다.
- 최근 댓글 50개를 최신순으로 표시합니다.
- 댓글은 공개되며 방문자는 새 댓글 등록과 조회만 할 수 있습니다.
- 방문자에게 댓글 수정/삭제 권한은 제공하지 않습니다.

## 보안 주의
- 브라우저에는 Publishable/anon 키만 사용합니다.
- service_role/secret 키는 절대 프런트엔드에 넣지 않습니다.
- RLS 정책으로 공개 조회 및 등록만 허용합니다.

**중요:** 코드 변경만으로 DB가 자동 생성되지는 않습니다. Supabase에서 SQL을 실행하고 실제 Project URL 및 Publishable key를 설정해야 댓글 등록/조회가 작동합니다.
