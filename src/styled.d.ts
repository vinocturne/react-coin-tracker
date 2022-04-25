//declaration file을 생성
import "styled-components";

//declare module을 통해 styled-components의 declaration file을 확장한다.
declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
        listColor: string;
    }
}
