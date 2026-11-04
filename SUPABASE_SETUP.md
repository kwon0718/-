# 문의 DB 연결 설정

현재 사이트 코드는 Supabase 연결 및 문의 등록 기능으로 변경되었습니다. 실제 저장을 활성화하려면 아래 설정이 필요합니다.

1. https://supabase.com 에서 로그인 후 새 프로젝트를 만듭니다.
2. Supabase 대시보드의 SQL Editor에서 `supabase/contact_inquiries.sql` 파일 내용을 복사해 실행합니다.
3. Project Settings > API Keys에서 Project URL과 Publishable key(또는 legacy anon key)를 복사합니다.
4. 저장소의 `supabase-config.js`에서 `YOUR_SUPABASE_PROJECT_URL` 및 `YOUR_SUPABASE_PUBLISHABLE_KEY`를 실제 값으로 교체해 저장합니다.
5. GitHub Pages 배포가 끝나면 사이트 문의 폼에서 테스트 등록 후 Supabase Table Editor의 `contact_inquiries` 테이블에서 확인합니다.

보안:
- 브라우저에는 publishable/anon 키만 사용합니다.
- service_role/secret 키는 절대 프런트엔드에 넣지 않습니다.
- 방문자 역할은 문의 INSERT만 가능하며 조회/수정/삭제 권한은 없습니다.
- 관리자 조회는 Supabase 대시보드에서 진행합니다.

주의: Supabase 프로젝트 생성과 실제 키 입력 및 SQL 실행은 프로젝트 소유자 계정에서 직접 완료해야 합니다. 이 단계가 끝나기 전에는 문의 등록이 DB에 저장되지 않습니다.
