// import { CanActivate, ExecutionContext } from "@nestjs/common";
// import { Observable } from "rxjs";

// export class AthenticationGuard implements CanActivate {
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         console.log('inside authentication gurad')
//         const request = context.switchToHttp().getRequest()
//         console.log(request.headers)

//         return true
//     }

// } 