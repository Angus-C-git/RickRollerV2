import {
    Box,
    Input, 
    Select, 
    IconButton,
    FormControl,
    FormLabel,
    Tag,
    TagLabel,
    TagRightIcon,
    Wrap,
    Button,
    InputGroup,
    InputRightElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    useToast,
    useDisclosure,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Center,
    Text,
    useClipboard
} from '@chakra-ui/react'
import { 
    AddIcon, 
    CheckIcon, 
    CloseIcon, 
    CopyIcon, 
    LinkIcon, 
    RepeatIcon 
} from '@chakra-ui/icons'
import { useState, useRef } from 'react'



const CampaignForm = () => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const initialRef = useRef()
    const finalRef = useRef()

    const [ newCampaign, setNewCampaign ] = useState(false)
    const [ campaignName, setCampaignName ] = useState('')
    const [ selectedCampaign, setSelectedCampaign ] = useState('')
    const [ newTagName, setNewTagName ] = useState('')
    const [ campaigns, setCampaigns ] = useState([
        'Email Campaign',
        'SMS Campaign',
    ])
    const [ tags, setTags ] = useState([
        'Email',
        'SMS',
        'Messenger',
        'Social Media',
        'Embedded',
        'Forum',
        'Redirect',
    ])
    const [ selectedTags, setSelectedTags ] = useState([])
    const [ linkName, setLinkName ] = useState('')
    const [ showAddTag, setShowAddTag ] = useState(false)

    // link gen handlers
    const [ link, setLink ] = useState('http://example.com/1283hadgvahgf1?id=12688615')
    const [ linkPanel, setLinkPanel ] = useState(false)
    const [ generating, setGenerating ] = useState(false)
    const { hasCopied, onCopy } = useClipboard(link)


    // error states
    const [ campaignNameError, setCampaignNameError ] = useState(false)
    const [ selectedCampaignError, setSelectedCampaignError ] = useState(false)
    const [ linkNameError, setLinkNameError ] = useState(false)
    const [ newTagError, setNewTagError ] = useState(false)

    // tag selection handler
    const handleTagSelection = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag))
            toast({
                title: 'Tag Removed',
                status: 'info',
                position: 'bottom-left',
                duration: 1000,
                isClosable: true,
            })
        } else {
            setSelectedTags([...selectedTags, tag])
            toast({
                title: 'Tag Added',
                status: 'success',
                position: 'bottom-left',
                duration: 1000,
                isClosable: true,
            })
        }
    }

    const handleClear = () => {
        setCampaignName('')
        setNewCampaign(!newCampaign)
    }

    const handleConfirmName = () => {
        // clear error state
        setCampaignNameError(false)

        // validate name
        if (campaignName.length < 1) {
            setCampaignNameError(true)
            return
        }

        setNewCampaign(!newCampaign)

        // TODO: POST to /api/campaigns
        // to add new campaign (or do on submission)

        // optimistic local state
        setCampaigns([
            ...campaigns,
            campaignName
        ])

        // set the selected campaign to the new campaign
        setSelectedCampaign(campaignName)

        // clear the input
        setCampaignName('')
    }

    const formValidationError = () => {
        setGenerating(false)
        toast({
            title: 'Please fill out all fields',
            status: 'error',
            position: 'bottom-left',
            duration: 1000,
            isClosable: true,
        })
    }


    const handleSubmit = () => {

        setGenerating(true)

        // clear error state
        setSelectedCampaignError(false)
        setLinkNameError(false)

        // validate campaign
        if (selectedCampaign === '') {
            setSelectedCampaignError(true)
            formValidationError()
            return
        }

        // validate name
        if (linkName.length < 1) {
            setLinkNameError(true)
            formValidationError()
            return
        }


        // TODO: POST to API
        console.log('[>>] form validated, sending request')
        console.log('[>>] selected campaign:', selectedCampaign)
        console.log('[>>] selected tags:', selectedTags)
        console.log('[>>] link name:', linkName)

        // toast success
        toast({
            title: 'Generating link!',
            status: 'success',
            position: 'bottom-left',
            duration: 1000,
            isClosable: true,
        })

        // tmp pause to simulate loading
        // API call
        setTimeout(() => {
            setGenerating(false)
            setLinkPanel(true)
        }, 2000)
    }

    const handleAddTag = () => {
        setShowAddTag(!showAddTag)
        onOpen()
    }

    const handleClose = () => {
        setShowAddTag(!showAddTag)
        setNewTagName('')
        onClose()
    }

    const handelReset = () => {
        setLinkName('')
        setSelectedCampaign('')
        setLinkPanel(false)
        setSelectedTags([])
    }

    const handleAddTagConfirm = () => {
        // clear error state
        setNewTagError(false)

        if (newTagName.length < 1) {
            setNewTagError(true)
            return
        }

        if (tags.length > 25) {
            toast({
                title: 'Maximum tags reached',
                status: 'error',
                position: 'bottom-left',
                duration: 2500,
                isClosable: true,
            })
            handleClose()
            return
        }

        
        // update tags
        setTags([...tags, newTagName])
        handleClose()

        // alert success
        toast({
            title: 'Tag Created',
            status: 'success',
            position: 'bottom-left',
            duration: 1500,
            isClosable: true,
        })
    }

    const copyLink = () => {
        onCopy()
        toast({
            title: 'Link Copied',
            status: 'success',
            position: 'bottom-left',
            duration: 1500,
            isClosable: true,
        })
    }


    const newTagModal = (
        <Modal
            isCentered
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={handleClose}
        >
            <ModalOverlay />

            <ModalContent bg='gray.700'>
                <ModalHeader color='white'>Add a Tag</ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel color='white'>Tag Name</FormLabel>
                        <Input 
                            ref={initialRef} 
                            placeholder='tag name'
                            color='white'
                            value={newTagName}
                            onChange={e => setNewTagName(e.target.value)}
                            isInvalid={newTagError}
                            errorBorderColor='crimson'
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        bg='teal.300'
                        color='white' 
                        mr={3}
                        onClick={handleAddTagConfirm}
                    >
                        Save
                    </Button>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )


    return (
        <Box>
            {/* FORM ZONE */}
            { !linkPanel && 
            <FormControl>
                <Box 
                    display='flex' 
                    alignItems='center' 
                    justifyContent='space-around'
                    maxWidth='600px'
                    flexFlow='row wrap'
                >
                    {!linkPanel && 
                    <Box m='5' width='250px' display='flex' flexDirection='row'>
                        <Box>
                            <FormLabel htmlFor='campaign' color='white'>
                                Campaign
                            </FormLabel>
                            { newCampaign ? 
                                <InputGroup>
                                    <Input 
                                        id='campaign-name'
                                        placeholder='campaign name' 
                                        type='text' 
                                        color='white' 
                                        size='lg'
                                        errorBorderColor='crimson'
                                        value={campaignName}
                                        onChange={(e) => setCampaignName(e.target.value)} 
                                        isInvalid={campaignNameError}
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            mt='2'
                                            size='xs'
                                            aria-label='clear-campaign-name'
                                            icon={<CloseIcon />}
                                            color='white'
                                            variant='outline'
                                            isRound
                                            onClick={() => handleClear()}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                :
                                <Select 
                                    id='campaign' 
                                    placeholder='select existing' 
                                    color='white' 
                                    size='lg'
                                    errorBorderColor='crimson'
                                    value={selectedCampaign}
                                    onChange={(e) => setSelectedCampaign(e.target.value)}
                                    isInvalid={selectedCampaignError}
                                >
                                    {
                                        campaigns.map((campaign, index) => {
                                            return <option key={index}>{campaign}</option>
                                        })
                                    }
                                </Select>
                            }
                        </Box>
                        {/* ADD CAMPAIGN BUTTON */}
                        <Box mt='8' ml='1'>
                            { newCampaign ?
                                <IconButton
                                    aria-label='confirm name'
                                    bg='teal.300'
                                    icon={<CheckIcon />}
                                    size='lg'
                                    color='white'
                                    onClick={() => handleConfirmName()}
                                />
                                :
                                <IconButton 
                                    aria-label='new campaign'
                                    bg='teal.300'
                                    color='white'
                                    icon={<AddIcon />}
                                    size='lg'
                                    onClick={() => setNewCampaign(!newCampaign)}
                                />
                            }
                        </Box>
       
                    </Box>
                    }
                    <Box m='5' width='250px'>
                        <FormLabel htmlFor='name' color='white'>
                            Name
                        </FormLabel>
                        <Input 
                            id='name'
                            placeholder='link name' 
                            type='text' 
                            color='white' 
                            size='lg' 
                            errorBorderColor='crimson'
                            value={linkName}
                            onChange={(e) => setLinkName(e.target.value)}
                            isInvalid={linkNameError}
                        />
                    </Box>
                    
                </Box>
            </FormControl>
            }

            {/* TAG ZONE - MAP FROM API*/}
            
            { !linkPanel &&
            <Box display='flex' alignItems='center' justifyContent='center' m='5' pb='10'>
                <Wrap spacing={4} maxWidth='550px' justify='center'>
                        {
                            tags.map((tag, index) => {
                                return (
                                    <Tag
                                        as={Button}
                                        size='lg'
                                        borderRadius='full'
                                        variant='solid'
                                        bg='gray.700'
                                        color='white'
                                        outlineColor={selectedTags.includes(tag) ? 'teal.500' : ''}
                                        key={index}
                                        onClick={() => handleTagSelection(tag)}
                                    >
                                        <TagLabel>{tag}</TagLabel>
                                        <TagRightIcon as={AddIcon} />
                                    </Tag>
                                )
                            })
                        }
                        {/* ADD TAG */}
                        <IconButton
                            aria-label='add tag'
                            bg='teal.300'
                            color='white'
                            icon={<AddIcon />}
                            size='md'
                            isRound
                            onClick={() => handleAddTag()}
                        />
                </Wrap>
            </Box>
            }

            {/* LINK DISPLAY */}
            { linkPanel &&
                <Box mt='100' mb='155'>
                    <Center>
                        <Text fontSize='2xl' color='white'>
                            { link }
                        </Text>
                        <IconButton
                            ml='2'
                            aria-label='copy link'
                            bg='teal.300'
                            color='white'
                            icon={ hasCopied ? <CheckIcon />: <CopyIcon />}
                            size='md'
                            isRound
                            onClick={copyLink}
                        />
                    </Center>
                </Box>
            }            

            {/* GENERATE BUTTON */}
            <Box display='flex' justifyContent='center'>
                <Box>
                    <Button 
                        bg='teal.300' 
                        color='white' 
                        size='lg'
                        boxShadow='dark-lg'
                        rightIcon={<LinkIcon />}
                        isLoading={generating}
                        onClick={handleSubmit}
                    >
                        GENERATE
                    </Button>
                    { linkPanel && 
                        <IconButton
                            ml='5'
                            aria-label='refresh-button'
                            bg='teal.300'
                            color='white'
                            size='lg'
                            icon={<RepeatIcon />}
                            onClick={handelReset}
                        />
                    }
                </Box>
            </Box>

            {/* MODAL */}
            { showAddTag ?
                newTagModal
                :
                null
            }
        </Box>
    )
}


export default CampaignForm