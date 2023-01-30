import './calendar-table.css';
import {useEffect, useRef} from "react";
import $ from 'jquery';
import _ from 'lodash';
import {Info} from "luxon";

const CalendarTable = () => {
    const tableScrollRef = useRef();
    const tableRef = useRef();

    const year = useRef(14600);
    const day = useRef(24);

    const tableWidth = year.current * 200;
    const tableHeight = day.current * 70;

    useEffect(() => {

        // console.log(window.innerHeight)
        // console.log(window.innerWidth)


        const virtualize = () => {
            const HOUR_HEADER_COLUMNS = 70;
            const DAY_HEADER_COLUMNS = 70;

            // console.log('scroll');
            const $container = $(tableRef.current);
            $container.empty();

            const tableViewportWidth = tableScrollRef.current.offsetWidth * 2;
            const tableViewportHeight = tableScrollRef.current.offsetHeight * 2;
            // console.log(tableScrollRef.current.offsetWidth)
            // console.log(tableScrollRef.current.offsetHeight)

            const startIndexVertical = Math.round((tableScrollRef.current.scrollTop >= 50 ? tableScrollRef.current.scrollTop - 70 : tableScrollRef.current.scrollTop) / 70);
            const endIndexVertical = Math.round((tableScrollRef.current.scrollTop + tableViewportWidth) / 70);

            console.log('offsetHeight + scrollTop', tableScrollRef.current.offsetHeight + tableScrollRef.current.scrollTop)
            console.log('offsetWidth + scrollLeft', tableScrollRef.current.offsetWidth + tableScrollRef.current.scrollLeft)
            console.log('offsetWidth + scrollLeft', tableScrollRef.current.scrollLeft + tableViewportHeight)
            console.log('offsetWidth + scrollLeft', tableScrollRef.current.scrollTop + tableViewportWidth)


            const startIndexHorizontal = Math.round((tableScrollRef.current.scrollLeft >= 150 ? tableScrollRef.current.scrollLeft - 200 : tableScrollRef.current.scrollLeft) / 200);
            const endIndexHorizontal = Math.round((tableScrollRef.current.scrollLeft + tableViewportHeight) / 200);

            console.log(startIndexHorizontal);
            console.log(endIndexHorizontal);

            $container.append($('<div></div>', {
                class: 'fixed-header', css: {
                    'top': Math.round(tableScrollRef.current.scrollTop),
                    'left': Math.round(tableScrollRef.current.scrollLeft),
                }, click: () => {
                    // console.log(top, left);
                }
            }));


            for (let h = startIndexVertical; h < endIndexVertical; h++) {
                const top = Math.round(h * 70);
                const left = Math.round(tableScrollRef.current.scrollLeft);

                $container.append($('<div></div>', {
                    class: 'hour-header', css: {
                        'top': top, 'left': left,
                    }, click: () => {
                        console.log(top, left);
                    }
                }));

            }


            for (let d = startIndexHorizontal; d < endIndexHorizontal; d++) {
                const top = Math.round(tableScrollRef.current.scrollTop);
                const left = Math.round(HOUR_HEADER_COLUMNS + (d * 200));

                $container.append($('<div></div>', {
                    class: 'day-header', css: {
                        'top': top, 'left': left,
                    }, click: () => {
                        console.log(top, left);
                    }
                }));
            }

            for (let y = startIndexVertical; y < endIndexVertical; y++) {
                for (let x = startIndexHorizontal; x < endIndexHorizontal; x++) {
                    const top = Math.round(DAY_HEADER_COLUMNS + (y * 70));
                    const left = Math.round(HOUR_HEADER_COLUMNS + (x * 200));

                    $container.append($('<div></div>', {
                        class: 'hour-cell', css: {
                            'top': top, 'left': left,
                        }, click: () => {
                            console.log(top, left);
                        }
                    }));
                }
            }
        }

        virtualize();

        tableScrollRef.current.addEventListener('scroll', virtualize);

        return () => {
            tableScrollRef.current.removeEventListener('scroll', virtualize);
        }
    }, [])

    return (<div className="table-scroll" ref={tableScrollRef}>
            <div className="table" ref={tableRef} style={{
                width: tableWidth, height: tableHeight
            }}>
            </div>
        </div>);
};
export default CalendarTable;