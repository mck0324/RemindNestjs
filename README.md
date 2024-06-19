- Nest에서 Controller란?
1.Express에서 Router와 비슷함
2.그냥 url를 가져오는 역할

- Service?
ex)Controller에서 바로 리턴을 할 수 있지만 왜 Service가 필요할까?
1.NestJS는 Controller를 비즈니스 로직이랑 구분짓고 싶어한다.

쉽게 말해
Cotroller는 모든 url을 다 넣어놓고,Service는 필요하다면 데이터베이스와 연락하는곳

Single-responsibility principle이란?
하나의 moudule,class 혹은 function이 하나의 기능은 꼭 책임져야한다.

Dependency Injection이란?
ex)Movies모듈에서 providers:MoviesService를 등록하여 Controller에서 'constructor(private readonly movieService: MoviesService) {}'를 사용하여 Service를 불러올 수 있게 된다.
그러므로 Module의 provider에 import를하고 Controller에 Inject(주입)

Testing
1.유닛테스트
- 시스템에서 function 같은 하나의 유닛만을 테스트
ex)MoviceServce -> getAll()
2.e2e(End To End)테스트
- 전체시스템을 테스트 
ex)사용자 관점에서 페이지 이동시 데이터 등!