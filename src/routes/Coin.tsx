import { useEffect, useState } from "react";
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

interface RouteState {
    state: {
        name: string;
    };
}

// interface ITag {
//     coin_counter: number;
//     ico_counter: number;
//     id: string;
//     name: string;
// }
//interface명 앞에 대문자 I를 적음으로써 interface를 명시하기도 한다.
interface InfoData {
    // 객체배열로 이루어진 타입의 내부 객체 인터페이스를 정의하고 싶으면
    // 따로 해당 인터페이스를 작성한 뒤, 인터페이스명[]를 통해 지정할 수 있다.
    // tags: ITag[];
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

function Coin() {
    const { coinId } = useParams();
    const [loading, setLoading] = useState(true);
    const { state } = useLocation() as RouteState;
    // 기존에 인터페이스를 적용하지 않았을 때에는 해당 타입을 모르므로 {}를 사용하여 알려줬지만
    // 인터페이스를 적용한 뒤에는 타입들을 모두 알기 때문에 비워두도록 한다.
    // const [info, setInfo] = useState({});
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                priceInfo?.quotes.USD.ath_price
            )}
            {/* 
                priceInfo에 ?를 넣는 이유
                priceInfo자체가 api를 통해 넘어오기 때문에 무조건적으로 값이 들어오지는 않기 때문에
                이를 알려주기 위해 ?를 표시.
             */}
        </Container>
    );
}

export default Coin;
