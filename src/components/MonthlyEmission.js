import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import useEcharts from "react-hooks-echarts";
import echarts from "echarts";



const MonthlyEmission = () => {
    const getTotalEmission = () => {
        let _totalEmission = 0;
        emissionData.forEach(element => {
            _totalEmission += element.ngConsumption;
        });
        return _totalEmission;
    }

    const generateRandomValue = () => {
        return Math.floor(Math.random() * 500 + 1);
    }

    const getGHGEmission = () => {
        const ghgEm = totalEmission * (
            warmingPotential["CO2"] * combusionEmissionFactor["CO2"] +
            warmingPotential["CH4"] * combusionEmissionFactor["CH4"] +
            warmingPotential["N2O"] * combusionEmissionFactor["N2O"]
        );
        return Math.round(ghgEm * 1000) / 1000
    }



    const [chartRef, ref] = useEcharts()
    const [warmingPotential, setWarmingPotential] = useState({
        CO2: 1,
        CH4: 25,
        N2O: 298,
    })

    const [combusionEmissionFactor, setCombusionEmissionFactor] = useState({
        CO2: 2.33e-3,
        CH4: 6.4e-7,
        N2O: 6.0e-8,
    })

    const [emissionData, setEmissionData] = useState([
        { id: 1, month: "January", ngConsumption: generateRandomValue() },
        { id: 2, month: "Februray", ngConsumption: generateRandomValue() },
        { id: 3, month: "March", ngConsumption: generateRandomValue() },
        { id: 4, month: "April", ngConsumption: generateRandomValue() },
        { id: 5, month: "May", ngConsumption: generateRandomValue() },
        { id: 6, month: "June", ngConsumption: generateRandomValue() },
        { id: 7, month: "July", ngConsumption: generateRandomValue() },
        { id: 8, month: "August", ngConsumption: generateRandomValue() },
        { id: 9, month: "September", ngConsumption: generateRandomValue() },
        { id: 10, month: "October", ngConsumption: generateRandomValue() },
        { id: 11, month: "November", ngConsumption: generateRandomValue() },
        { id: 12, month: "December", ngConsumption: generateRandomValue() }
    ])

    const [totalEmission, setTotalEmission] = useState(getTotalEmission())

    const [ghgEmission, setGhgEmission] = useState(getGHGEmission())

    useEffect(() => {
        const chart = chartRef.current;
        chart.setOption({
            color: ["#e91e63", "#354EF6"],
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisLabel: {
                    interval: 0,
                    rotate: 45,

                    baseline: "top",
                    color: "#333",
                    fontSize: 15,
                    fontWeight: "bold"

                }
            },
            yAxis: {
                name: "NG Consumption",
                type: 'value',
                axisLabel: {
                    interval: 0,
                    baseline: "top",
                    color: "#333",
                    fontSize: 15,
                    fontWeight: "bold"

                }
            },
            series: [
                {
                    data: emissionData.map(data => data.ngConsumption),
                    type: 'bar'
                }
            ]

        })
    }, [emissionData])

    const updateFieldChanged = index => e => {
        const { value } = e.target;
        let newState = [...emissionData];
        newState[index].ngConsumption = parseInt(value);

        setEmissionData(newState)
        setTotalEmission(getTotalEmission())
    }

    return (<section className="mt-4">
        <div className="container border">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="mb-4">Emission Data</h2>
                </div>
                <div className="col-md-6">
                    <h2>Factors</h2>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h3>Monthly Consumption</h3>
                    <Table responsive bordered hover size="sm">
                        <thead>
                            <tr className="table-primary">
                                <th>Month</th>
                                <th>Natural Gas Consumption</th>
                                <th>unit</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {emissionData.map((data, index) => {
                                const { id, month, ngConsumption } = data
                                return (

                                    <tr key={id}>
                                        <td>{month}</td>
                                        <td>
                                            <Form.Control
                                                size="sm"
                                                type="text"
                                                name={month}
                                                value={ngConsumption}
                                                onChange={updateFieldChanged(index)}
                                            />
                                        </td>
                                        <td>m3</td>
                                    </tr>
                                )
                            })}
                            <tr className="table-dark fw-bold">
                                <td>Total</td>
                                <td>{totalEmission}</td>
                                <td>m3</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-md-4">
                    <h3 className="mt-0">Warming Potential</h3>
                    <Table responsive bordered hover size="sm">
                        <thead>
                            <tr className="table-primary">
                                <th>Species</th>
                                <th>Global Warming Potential Multiplier</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {Object.keys(warmingPotential).map((data, index) => {
                                // console.log(data)
                                return (
                                    <tr key={index}>
                                        <td>{data}</td>
                                        <td>{warmingPotential[data]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <h3 className="mt-0">Combustion Intensity</h3>
                    <Table responsive bordered hover size="sm">
                        <thead>
                            <tr className="table-primary">
                                <th>Species</th>
                                <th>Gas Combustion Emission Factor (t/m3)</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {Object.keys(combusionEmissionFactor).map((data, index) => {
                                // console.log(data)
                                return (
                                    <tr key={index}>
                                        <td>{data}</td>
                                        <td>{combusionEmissionFactor[data]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <div>
                        <h1 className="mt-3" style={{ color: "#1E90FF" }}>GHG Emission:</h1>
                        <h2 style={{ color: "#e91e63" }}>{ghgEmission} tonne CO<sub>2</sub> (eqv.)</h2>
                    </div>
                </div>
            </div>
            <div ref={ref} className="chart row" style={{ height: 600 }}></div>
        </div>
        <div className="row text-center mt-2">
            <h4>KAVAN MOTAZEDI @2022</h4>
        </div>

    </section>);
}

export default MonthlyEmission;