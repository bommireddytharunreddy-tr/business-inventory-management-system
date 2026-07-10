import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function PurchaseChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        loadChart();

    }, []);

    const loadChart = async () => {

        try {

            const response = await api.get(
                "/dashboard/monthly-purchases"
            );

            setData(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="card shadow">

            <div className="card-header">

                <h5 className="mb-0">
                    Monthly Purchases
                </h5>

            </div>

            <div className="card-body">

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Line
                            type="monotone"
                            dataKey="purchases"
                            stroke="#198754"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default PurchaseChart;