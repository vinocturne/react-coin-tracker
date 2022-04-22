import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Image = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
`;

function Coins() {
    //useQuery의 첫 번째 인자로는 query key(고유식별자), 두번째는 fetch함수를 넣는다. 세 번째에는 옵션에 따라 config를 삽입한다.
    //useQuery 내부 변수중에는 isLoading과 data가 존재하는데, isLoading은 데이터가 불러와졌는지를 확인하고
    //data에는 fetch가 끝난 데이터가 들어가게 된다.
    //isLoading, data 외에 사용 가능한 변수들은 공식문서 참조. https://react-query.tanstack.com/reference/useQuery
    //이전에 사용한 수많은 줄의 코드들이 한 줄로 끝나게 된다.
    //또한 다른 페이지로 이동했다가 돌아왔을 때 저장해둔 캐시를 가지고 작동하기 때문에 로딩이 없다.
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link
                                to={`/${coin.id}`}
                                state={{ name: coin.name }}
                            >
                                <Image
                                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                                />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;
