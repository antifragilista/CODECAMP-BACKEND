# 컴퓨터 만드는 설명서

# 1. 운영체제 설치(node 14버전과 npm과 yarn이 모두 설치되어있는 리눅스)
FROM node:20

# 2. package.json과 pnpm-lock.yaml을 먼저 받아 패키지 충돌 내용을 먼저 확인
# 충돌 내용 없다면 패키지 설치 스킵(캐시). => 소스코드 수정 시 해당 소스코드만 변경
# 충돌 내용 있다면 패키지 설치 진행
COPY ./package.json /myfolder/
COPY ./pnpm-lock.yaml /myfolder/
WORKDIR /myfolder/

RUN npm install -g pnpm
RUN pnpm install

COPY . /myfolder/

# 3. 도커안에서 index.js 실행시키기
CMD pnpm start:dev