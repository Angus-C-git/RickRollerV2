import {
    Box, 
    ChakraProvider, 
    SimpleGrid
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import get from 'axios'
import CampaignsTable from '../components/CampaignsTable'
import ClicksChart from '../components/ClicksChart'
import Nav from '../components/Nav'
import StatsPanel from '../components/StatsPanel'
import StatsPie from '../components/StatsPie'
import { API_BASE } from '../utils/constants'


export default function Stats() {

    const [ campaignsData, setCampaignsData ] = useState([
        // {
        //     name: 'Email',
        //     started: date,
        //     clicks: number
        // },
    ])

    const [ clickData, setClickData ] = useState([
        // {
        //     month: string,
        //     clicks: number,
        // },
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
    );

    /** @TODO format dates */
    // fetch sats from api and update state
    useEffect(() => {
        console.log("[>>] loading stats")
        get(`${API_BASE}/stats`, { withCredentials: true })
            .then(response => {
                console.log(`[<<] loaded stats :: ${JSON.stringify(response.data)}`)
                setGenerated(response.data.generatedLinks)
                setGeneratedIncrease(response.data.generatedIncrease)
                setClicked(response.data.clicks)
                setClickedIncrease(response.data.clickIncrease)
                setClickData(response.data.clicksHistory)
                setRank(response.data.rank)
                setRankIncrease(response.data.rankIncrease)
                setCampaignsData(response.data.campaigns)
                setCampaignCount(response.data.netCampaigns)
                setCampaignsSince(response.data.campaignsSince)
            }).catch(error => {
                console.log(`[<<] error loading stats :: ${error}`)
                /** @TODO -> error msg */
            }
        )
    }, [])




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