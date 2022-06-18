import { Box, Center, Heading } from "@chakra-ui/react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ClicksChartProps {
    clickData: Array<{
        month: string
        clicks: number
    }>
}


const ClicksChart = ({ clickData }: ClicksChartProps) => {
    return (
        <Box bg='gray.800' minHeight='400px' borderRadius='15px' boxShadow='dark-lg'>
            <Heading as='h4' size='lg' color='white' ml='5' pt='2' mb='5'>
                Clicks Over Time
            </Heading>
            <Center>
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart
                        width={500}
                        height={300}
                        data={clickData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>                
            </Center>
        </Box>
    )
}

export default ClicksChart