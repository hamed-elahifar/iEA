// import { CanActivate, ContextType, ExecutionContext, UnauthorizedException } from "@nestjs/common";
// import { GqlExecutionContext } from "@nestjs/graphql";
// import { JwtService } from "@nestjs/jwt";
// import { Observable } from "rxjs";

// export class AthenticationGuard implements CanActivate {
//     constructor(private readonly jwtService: JwtService) { }

//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

//         try {
//             const request = context.switchToHttp().getRequest()
//             const token = request.headers.authorization.split(' ')[1]
//             console.log(token)
//             if (!token) {
//                 throw new UnauthorizedException
//             }

//             request.user = this.jwtService.verify(token)
//         } catch (error) {
//             console.log(error)
//         }
//         return true
//     }
// } 
