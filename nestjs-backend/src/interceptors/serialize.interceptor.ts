import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { map, Observable } from 'rxjs'

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('拦截器执行前')
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          // 设置为 true 之后，所有经过该 interceptor 的接口都需要设置 Expose 或 Exclude
          excludeExtraneousValues: true,
        })
      }),
    )
  }
}
