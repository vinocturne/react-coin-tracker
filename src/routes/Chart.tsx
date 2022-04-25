import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart() {
    const isDark = useRecoilValue(isDarkAtom);
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId)
    );
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexChart
                    type="candlestick"
                    series={[
                        {
                            name: "price",
                            // data: data?.map((price) => price.close) ?? [],
                            data: (data?.map((data: IHistorical) => ({
                                x: data.time_open,
                                y: [
                                    data.open.toFixed(2),
                                    data.high.toFixed(2),
                                    data.low.toFixed(2),
                                    data.close.toFixed(2),
                                ],
                            })) as unknown) as number[],
                        },
                    ]}
                    options={{
                        theme: { mode: isDark ? "dark" : "light" },
                        chart: {
                            height: 300,
                            width: 500,
                            background: "transparent",
                        },
                        grid: {
                            show: false,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisTicks: {
                                show: false,
                            },
                            axisBorder: {
                                show: false,
                            },
                            labels: {
                                show: false,
                            },
                            type: "datetime",
                            categories: data?.map((price) => price.time_close),
                        },
                        stroke: {
                            curve: "smooth",
                            width: 2,
                        },
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(3)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;
