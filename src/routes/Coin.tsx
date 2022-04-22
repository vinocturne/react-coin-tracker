import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

//Link의 state를 사용하여 데이터를 넘겨줄 때 interface는
//state를 한 번 감싸도록 만들어주고
//useLocation()으로 불러올 때 'as 인터페이스명'으로
interface RouteState {
    state: {
        name: string;
    };
}

function Coin() {
    const { coinId } = useParams();
    const [loading, setLoading] = useState(true);
    //단 Link의 state를 통해 들어오는 데이터의 경우,
    //해당 주소로 바로 들어올 때에는 그 값을 받아오지 못한다.
    //현재 코드의 경우, 주소로 바로 들어올 경우 title에도 Loading만 뜨게된다.
    const { state } = useLocation() as RouteState;
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    );
}

export default Coin;
