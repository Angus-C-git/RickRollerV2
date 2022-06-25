import {
    Box, 
    Center, 
    ChakraProvider, 
    SimpleGrid,
    Spinner
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
    const [ generated, setGenerated ] = useState()
    const [ generatedIncrease, setGeneratedIncrease ] = useState()
    const [ clicked, setClicked ] = useState()
    const [ clickedIncrease, setClickedIncrease ] = useState()
    const [ rank, setRank  ] = useState()
    const [ rankIncrease, setRankIncrease ] = useState()
    const [ campaignCount, setCampaignCount ] = useState()
    const [ campaignsSince, setCampaignsSince ] = useState()

    // load handler
    const [ isLoading, setIsLoading ] = useState(false)

    /** @TODO format dates */
    // fetch stats from api and update state
    useEffect(() => {
        setIsLoading(true)
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
                /** @TODO -> use toast for error */
            }).finally(() => {
                setIsLoading(false)
            })

    }, [])


    if (isLoading){
        return (
            <Center h='100vh' bg='gray.700'>
                <Spinner size='xl' color='teal' thickness='4px' />
            </Center>
        )
    }


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