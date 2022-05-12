import {
    Box, 
    ChakraProvider, 
    SimpleGrid
} from '@chakra-ui/react'
import { useState } from 'react'
import CampaignsTable from '../components/CampaignsTable'
import ClicksChart from '../components/ClicksChart'
import Nav from '../components/Nav'
import StatsPanel from '../components/StatsPanel'
import StatsPie from '../components/StatsPie'


export default function Stats() {

    (function () {
        console.log("[>>] loading stats stub")
        // TODO API CALL
    })()

    const [ campaignsData, setCampaignsData ] = useState([
        {
            name: 'Email',
            started: new Date().toLocaleDateString(),
            total: 100
        },
        {
            name: 'SMS',
            started: new Date().toLocaleDateString(),
            total: 200
        },
        {
            name: 'Messenger',
            started: new Date().toLocaleDateString(),
            total: 300
        },
        {
            name: 'Embedded',
            started: new Date().toLocaleDateString(),
            total: 100
        },
        {
            name: 'Comments',
            started: new Date().toLocaleDateString(),
            total: 150
        },
        {
            name: 'Redirect',
            started: new Date().toLocaleDateString(),
            total: 50
        },
    ])

    const [ clickData, setClickData ] = useState([
        {
            name: 'Jan',
            clicks: 1000,
        },
        {
            name: 'Feb',
            clicks: 3000,
        },
        {
            name: 'Mar',
            clicks: 2000,
        },
        {
            name: 'Apr',
            clicks: 2780,
        },
        {
            name: 'May',
            clicks: 1890,
        },
        {
            name: 'Jun',
            clicks: 2390,
        },
        {
            name: 'July',
            clicks: 2490,
        },
        {
            name: 'Aug',
            clicks: 1590,
        },
        {
            name: 'Sep',
            clicks: 2010,
        },
        {
            name: 'Oct',
            clicks: 490,
        },
        {
            name: 'Nov',
            clicks: 3490,
        },
        {
            name: 'Dec',
            clicks: 3590,
        },
    ])
    
    // tmp hardcoded data
    const [ generated, setGenerated ] = useState(3105)
    const [ generatedIncrease, setGeneratedIncrease ] = useState(23.36)
    const [ clicked, setClicked ] = useState(315)
    const [ clickedIncrease, setClickedIncrease ] = useState(-9.05)
    const [ rank, setRank  ] = useState(4)
    const [ rankIncrease, setRankIncrease ] = useState(9.5)
    const [ campaignCount, setCampaignCount ] = useState(351)
    const [ campaignsSince, setCampaignsSince ] = useState(
        new Date(2021, 5, 1).toLocaleString('default', { month: 'short' })
    )



    return (
        <ChakraProvider>
            <Box bg='gray.700' h='100vh'>
                <Nav />
                
                <SimpleGrid columns={{sm: 1, md: 2}} spacing={{base: 5, lg: 10}} m='5'>
                    <Box>
                        <StatsPie campaignData={campaignsData} />
                    </Box>
                    <Box>
                        <CampaignsTable campaigns={campaignsData} />
                    </Box>
                    <Box>
                        <ClicksChart clickData={clickData} />
                    </Box>
                    <Box>
                        <StatsPanel 
                            generated={generated}
                            generatedIncrease={generatedIncrease}
                            clicked={clicked}
                            clickedIncrease={clickedIncrease}
                            rank={rank}
                            rankIncrease={rankIncrease}
                            campaignCount={campaignCount}
                            campaignsSince={campaignsSince}
                        />
                    </Box>
                </SimpleGrid>
            </Box>
        </ChakraProvider>
    )
}