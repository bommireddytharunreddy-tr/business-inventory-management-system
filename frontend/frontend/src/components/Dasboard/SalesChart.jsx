import { useEffect, useState } from "react";

import api from "../../api/axios";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

function SalesChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        loadChart();

    }, []);

    const loadChart = async () => {

        try {

            const response = await api.get(
                "/dashboard/monthly-sales"
            );

            setData(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="card shadow mt-4">

            <div className="card-header">

                <h5 className="mb-0">
                    Monthly Sales
                </h5>

            </div>

            <div className="card-body">

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="sales"
                            fill="#0d6efd"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default SalesChart;