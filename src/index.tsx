import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
// import { ThemeProvider } from "styled-components";
// import { LightTheme, DarkTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

//리액트 쿼리를 선언하고, QueryClientProvider를 통해 앱을 감싸준다.
//앱을 감싸게 되면 앱 내의 어느 컴포넌트에서든지 provider로 접근이 가능하다.
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                {/* <ThemeProvider theme={LightTheme}> */}
                <App />
                {/* </ThemeProvider> */}
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>
);
