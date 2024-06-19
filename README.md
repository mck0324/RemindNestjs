- Nest에서 Controller란?
1.Express에서 Router와 비슷함
2.그냥 url를 가져오는 역할

- Service?
ex)Controller에서 바로 리턴을 할 수 있지만 왜 Service가 필요할까?
1.NestJS는 Controller를 비즈니스 로직이랑 구분짓고 싶어한다.

쉽게 말해
Cotroller는 모든 url을 다 넣어놓고,Service는 필요하다면 데이터베이스와 연락하는곳