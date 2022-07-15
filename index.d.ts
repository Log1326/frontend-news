declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.docx'
declare module 'jwt-decode' {
    namespace JwtDecode {
        interface JwtDecodeStatic {
            (token: string): any;
        }
    }

    let jwtDecode: JwtDecode.JwtDecodeStatic;
    export = jwtDecode;
export as namespace jwt_decode;
}