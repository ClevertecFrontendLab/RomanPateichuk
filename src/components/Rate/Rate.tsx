import React, {useState} from "react";
import {Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import styles from "./Rate.module.scss";

interface CustomRateProps {
    size: string,
    disabled?: boolean,
    value?: string,
}

export const CustomRate: React.FC<CustomRateProps> = (props) => {
    const {value, disabled, size, ...field} = props
    const [customValue, setCustomValue] = useState(0)

    const iconStyles = {
        color: "#faad14",
        width: size,
        height: size
    }

    const onChangeHandle = (value: number)=>{
        setCustomValue(value)
    }

    const getIcon = (index: number) => {
        if (index + 1 <= (value || customValue)) {
            return <StarFilled
                style={iconStyles}
            />;
        } else {
            return <StarOutlined
                style={iconStyles}
            />;
        }
    }

    return <Rate count={5}
                 value={value || customValue}
                 className={styles.rate}
                 onChange={onChangeHandle}
                 character={({index}) => getIcon(index as number)}
                 {...field}
    />
}
