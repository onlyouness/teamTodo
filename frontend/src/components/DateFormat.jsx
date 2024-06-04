import React from "react";

const DateFormat = ({DateProvided}) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };
    const date = formatDate(DateProvided)
    return <div>
        {date}
    </div>;
};

export default DateFormat;
