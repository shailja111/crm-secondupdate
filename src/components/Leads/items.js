import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";

const LeadItems = ({ ad, index }) => {
    const itemRef = useRef(null);

    useEffect(() => {
        $(itemRef.current).draggable({
            revert: true,
            helper: "clone",
            start: function (event, ui) {
                ui.helper.data("ad", ad); // Store the ad data
                ui.helper.data("index", index); // Store the index as well
            },
        });
    }, [ad, index]);

    return (
        <div ref={itemRef} className="draggable-item">
            <strong>Ad Name:</strong> {ad[3] || "N/A"} <br />
            <strong>Created Time:</strong> {ad[1] || "N/A"}
        </div>
    );
};

export default LeadItems;
