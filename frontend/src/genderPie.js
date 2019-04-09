import React from "react";
import {Chart, Geom, Axis, Tooltip, Coord, Label, Legend,} from "bizcharts";

class GenderPie extends React.Component {
    transformData(data) {
        let ds = [];
        let i = 0;
        for (let key in data) {
            ds[i] = {item: key, percent: data[key]};
            i++;
        }
        return ds;
    }

    render() {
        const data = this.transformData(this.props.data);
        const cols = {
            percent: {
                formatter: val => {
                    val = Math.round(val * 10000) / 100 + "%";
                    return val;
                }
            }
        };
        return (
            <div>
                <Chart
                    height={window.innerHeight}
                    data={data}
                    scale={cols}
                    forceFit
                >
                    <Coord type="theta" radius={0.9}/>
                    <Axis name="percent"/>
                    <Legend/>
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color={['item', d => {
                            return d === '男' ? '' : 'red';
                        }]}
                        tooltip={[
                            "item*percent",
                            (item, percent) => {
                                percent = Math.round(percent * 10000) / 100 + "%";
                                return {
                                    name: item,
                                    value: percent
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 8,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            content="percent"
                            formatter={(val, item) => {
                                return item.point.item + ": " + val;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

GenderPie.defaultProps = {
    data: {'男': 0.5, '女': 0.5}
};
export default GenderPie;