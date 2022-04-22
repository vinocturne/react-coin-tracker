import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Moment from "react-moment";

interface IPrice {
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
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const PriceItem = styled.div`
    margin: 7px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    padding: 10px 15px;
`;
const ItemTitle = styled.span`
    font-size: 14px;
    color: grey;
`;

const ItemValue = styled.span<{ isRedFlg?: boolean }>`
    font-size: 1rem;
    color: ${(props) => (props.isRedFlg ? "red" : props.theme.accentColor)};
`;

function Price() {
    const priceInfo = useOutletContext<IPrice>();
    return (
        <>
            <Container>
                <PriceItem>
                    <ItemTitle>Current Prices: </ItemTitle>
                    <ItemValue>$ {priceInfo.price.toFixed(3)}</ItemValue>
                </PriceItem>
                <PriceItem>
                    <ItemTitle>Percent Change 12 Hours: </ItemTitle>
                    <ItemValue
                        isRedFlg={
                            priceInfo.percent_change_12h < 0 ? true : false
                        }
                    >
                        {priceInfo.percent_change_12h}%
                    </ItemValue>
                </PriceItem>
                <PriceItem>
                    <ItemTitle>Percent Change 24 Hours: </ItemTitle>
                    <ItemValue
                        isRedFlg={
                            priceInfo.percent_change_24h < 0 ? true : false
                        }
                    >
                        {priceInfo.percent_change_24h}%
                    </ItemValue>
                </PriceItem>
                <PriceItem>
                    <ItemTitle>Percent Change 7 days: </ItemTitle>
                    <ItemValue
                        isRedFlg={
                            priceInfo.percent_change_7d < 0 ? true : false
                        }
                    >
                        {priceInfo.percent_change_7d}%
                    </ItemValue>
                </PriceItem>
                <PriceItem>
                    <ItemTitle>Volume Change 24 Hours: </ItemTitle>
                    <ItemValue
                        isRedFlg={
                            priceInfo.volume_24h_change_24h < 0 ? true : false
                        }
                    >
                        {priceInfo.volume_24h_change_24h < 0
                            ? `- $${Math.abs(priceInfo.volume_24h_change_24h)}`
                            : `$${priceInfo.volume_24h_change_24h}`}
                    </ItemValue>
                </PriceItem>
                <PriceItem>
                    <ItemTitle>Maximum Price: </ItemTitle>
                    <ItemValue>$ {priceInfo.ath_price}</ItemValue>
                </PriceItem>
                <PriceItem>
                    <ItemTitle>Maximum Price Date: </ItemTitle>
                    <ItemValue>
                        <Moment format="YYYY/MM/DD" date={priceInfo.ath_date} />
                    </ItemValue>
                </PriceItem>
            </Container>
        </>
    );
}

export default Price;
