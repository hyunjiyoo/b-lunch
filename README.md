<div align="center">
  <img src="./public/logo192.png" alt="logo" width="120px" />
  <h2>B-Lunch</h2>
</div>

<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-0C152A?style=flat-square&logo=Tailwind CSS&logoColor=0DA5E9"/>
  <img src="https://img.shields.io/badge/Testing Library-FD4544?style=flat-square&logo=TestingLibrary&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/React Router-F44250?style=flat-square&logo=ReactRouter&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Icons-E91E62?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=ReactHookForm&logoColor=black"/>
  <img src="https://img.shields.io/badge/RamdaJS-884499?style=flat-square&logoColor=white"/>
  <img src="https://img.shields.io/badge/YupResolver-orange?style=flat-square&logo=Yup&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/Cloudinary-3447C5?style=flat-square&logoColor=white"/>
  <img src="https://img.shields.io/badge/Yarn-2B8EBB?style=flat-square&logo=Yarn&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-white?style=flat-square&logo=Vercel&logoColor=black"/>
</div>

<br />

## ▪️ 데모

https://b-lunch.vercel.app/

아래는 Admin 계정으로 로그인했을 경우, 상품등록 진행화면입니다.

<img src="https://res.cloudinary.com/dg0bagjoq/image/upload/v1675846527/ludfmzibb4ex5v7xpvsi.gif" alt="register" width="300px"/>
<br />

## ▪️ 어떤 서비스 ?

**나만의 도시락을 만들어 주는 쇼핑몰 (Balanced Lunch)**

카테고리 별로 담고싶은 음식을 담으면 당일 배송해주는 영양가있는 도시락을 신선하게 받을 수 있다.

<br />

## ▪️ 기능 구현

- 일반계정과 어드민계정을 분리하여, 어드민일 경우 상품등록 가능
- firebase Google OAuth 로그인 구현
- firebase Database 연동
- cloudinary 이미지저장소 연동하여 등록한 이미지 클라우드에 저장
- localStorage에 장바구니 데이터 저장
- yup 라이브러리 사용해 폼데이터 validation 검증
- React Hook Form 이용해 폼데이터 전달

<br />

## ▪️ 프로젝트를 통해 배운점

- 코드를 작성하기 전 데이터 구조 설계에 대한 고민하는 시간을 아끼지 말자.
  - 데이터 특성을 파악하여 어디에 저장할지 고민하고,
  - 데이터를 전달받는 곳에서도 데이터 생성시 만든 구조를 통해 접근하기 편하도록 설계한다.
- 어플리케이션의 전체적인 구조가 어떻게 가고있는지 유념하자.
- 개발 중에 잘 안되는 경우에는 잠시 멈추고 내가 무엇을 시도하고 있는지, 무엇을 시도하였는지 점검해본다.

<br />

## ▪️ 느낀점

```text
항상 그래왔듯이.. 아쉬움과 뿌듯함이 공존한다.
하지만 나는 이 프로젝트를 하며 나의 실패경험에 집중해본다.
많은 시도에 따른 실패를 통해 배움이 있었고, 나는 성장했다.

처음 프로젝트를 시작할때의 설렘을 기억한다.
단순 토이프로젝트를 넘어 실제로 배포하여 서비스화하고 싶은 마음이 들었다.
아직 완성되지 않은 기능들이 나의 숙제로 남아있지만
언젠가 나도 내가 개발한 어플리케이션으로 수익을 보는 날이 오지 않을까 기대해본다.

이번 프로젝트를 통해 처음 사용해보는 라이브러리도 있었고,
개념으로만 알고있던 기능들도 처음 시도해본 것이 많다.
나에게 있어 '처음'의 경험에서는 설레임, 두려움, 기대감이 포함되어 있는 것 같다.
이 프로젝트를 하며 나에게 남은 느낌과 같다.

프로젝트의 목적은 성장과 즐거움 그리고 실패였다.
목적을 달성해서 기쁘다. 허허
```

<br />

## ▪️ 미래의 나자신아 이 기능을 개발해주겠니❓

- 등록한 상품 수정 및 삭제 기능
- 주문하기 기능
- 구글 계정 이외의 계정으로 로그인 추가
- 장바구니 상품이 삭제되는 만료기간 설정
- 모바일 반응형 UI
- ...

<br />

## ▪️ 개선된 기능

- 랜딩페이지 로딩시간이 너무 길어 이미지 최적화 진행
  - 정적이미지인 배너이미지를 압축후 이미지형식변경 (png > webp)
  - cloudinary에서 받아오는 이미지 크기 옵션추가해서 요청
    - `q_10` 추가해서 quality 10%로 줄여서 요청
- 배포플랫폼 변경
  - Netlify > Vercel
  - Load 속도 향상 : `3,330ms > 648ms (약 20% 향상)`
  - DOMContentLoaded 속도 향상 : `461ms > 155ms (약 34% 향상)`
- 컴포넌트 테스트 코드 작성중.. 👩‍💻
  - Product component
  - Register component

## ▪️ 개발 기간

- 1차 배포: 2023.01.18 ~ 2023.02.08

<br />

## ▪️ 사용 언어

<img 
  src="https://user-images.githubusercontent.com/23496927/148519290-7ba474cb-a1d3-49fc-9da9-ede3555130eb.png" 
  height="60px" />
<img 
  src="https://user-images.githubusercontent.com/23496927/148519299-97198ced-65ad-4fc7-94c2-ec706404901c.png" 
  height="60px" />
<img 
  src="https://res.cloudinary.com/dg0bagjoq/image/upload/v1675839671/rvgrry8jifqfd6phdz5p.png" 
  height="60px" />

<br />

## ▪️ 배포

<img 
  src="https://res.cloudinary.com/dg0bagjoq/image/upload/v1683184442/bjy6fkweskay3lzmovak.png" 
  width="30%" 
  alt="Vercel_Logo"/>
