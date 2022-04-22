import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

//리액트 쿼리를 선언하고, QueryClientProvider를 통해 앱을 감싸준다.
//앱을 감싸게 되면 앱 내의 어느 컴포넌트에서든지 provider로 접근이 가능하다.
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
