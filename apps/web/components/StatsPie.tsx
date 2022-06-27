import {
    Box, Center, Heading,
} from '@chakra-ui/react'

import React, { useState, useCallback } from 'react'
import { 
    PieChart, 
    Pie, 
    Sector, 
    ResponsiveContainer 
} from 'recharts'

interface ActiveShapeProps {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    startAngle?: number
    endAngle?: number 
    fill: string
    payload: {
        name: string
        clicks: number
    }
    percent: number
    value: number
}

interface StatsPieProps {
    campaignData: Array<{
        name: string
        started: string
        clicks: number
    }>
}

const renderActiveShape = ({
    cx,
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    startAngle, 
    endAngle, 
    fill, 
    payload, 
    percent, 
    value  
}: ActiveShapeProps) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text 
                x={cx} 
                y={cy} 
                dy={8} 
                textAnchor="middle" 
                fill="#FFFFFF"
            >
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path 
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} 
                stroke={fill} 
                fill="none" 
            />
            <circle 
                cx={ex} 
                cy={ey} 
                r={2} 
                fill={fill} 
                stroke="none" 
            />
            <text 
                x={ex + (cos >= 0 ? 1 : -1) * 12} 
                y={ey} textAnchor={textAnchor} 
                fill="#4A5568"
            >
                {`Total ${payload.clicks}`}
            </text>
            <text 
                x={ex + (cos >= 0 ? 1 : -1) * 12} 
                y={ey} 
                dy={18} 
                textAnchor={textAnchor} 
                fill="#999"
            >
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const StatsPie = ({ campaignData }: StatsPieProps) => {

    const [ activeIndex, setActiveIndex ] = useState(0)


	const onPieEnter = useCallback(
		(_, index) => {
			setActiveIndex(index);
		},
		[setActiveIndex]
	);

    return (
        <Box bg='gray.800' minHeight='400px' borderRadius='15px' boxShadow='dark-lg'>
            <Heading as='h4' size='lg' color='white' ml='5' pt='2'>
                Campaign Overview
            </Heading>
            <Center>
                {campaignData.length > 0 ? (
                        <ResponsiveContainer width="95%" height={300}>
                            <PieChart>
                                <Pie
                                    data={campaignData}
                                    paddingAngle={5}
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#38A169"
                                    dataKey="clicks"
                                    onMouseEnter={onPieEnter}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <Heading as='h1' size='xl' color='gray.300' mt='150px'>
                            No Campaigns Yet
                        </Heading>
                    )}

            </Center>
        </Box>
    )
} 

export default StatsPie