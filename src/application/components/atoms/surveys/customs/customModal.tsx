import { AntDesign } from '@expo/vector-icons';
import { Button, Modal, Spinner, Text } from 'native-base';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UseEventService } from '../../../../redux/store/services/useEventServices';


export const CustomModal = ({ modalVisible, setModalVisible,content,type,title,handleSubmit,resetForSubmitAgain,submittingSurvey }: {title:string,submittingSurvey?:boolean, resetForSubmitAgain?:()=>void,handleSubmit?:() => void, type:string, modalVisible: boolean, setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,content:string }) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const navigate = useNavigate()
    const { event } = UseEventService()
    return (
        <>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
                <Modal.Content
                    maxWidth={['622']}
                    w={['80%', '100%']}
                    maxHeight={[280,388]}
                    height={['90%', '100%']}
                    nativeID='confirmModal'
                    pt={['20px','40px']}
                    pb={['20px','60px']}
                >
                    <Modal.Header py={0} borderBottomWidth={2} borderBottomColor={'rgba(173, 173, 173,0.3)'} nativeID='confirmModal'  flexDirection={'row'}
                        justifyContent={'space-between'} alignItems={'center'} px={['20px','60px']} pb={['10px','18px']}
                    >
                        <Text color='#1D9FE4' fontSize='28px' fontWeight="bold">{title}</Text>
                        <AntDesign name="close" size={24} color="#A39F9F" onPress={() => setModalVisible(false)} />
                    </Modal.Header>
                    <Modal.Body fontSize={'lg'} px={['20px','60px']} py={0} pt={['20px','60px']} nativeID='confirmModal' _text={{ color: '#6E6E6E', fontSize: "24px", fontWeight: "medium" }}  justifyContent={'center'}
                        alignItems={'flex-start'}
                    >
                        {content}
                    </Modal.Body>
                    <Modal.Footer borderTopWidth={0} nativeID='confirmModal' maxHeight={100} height={'100%'}  py={0} pt={['20px','60px']}>
                        <Button.Group space={1}   justifyContent={'flex-start'}>
                            <Button
                                _text={{ color: '#797979' }}
                                bg={'transparent'}
                                borderWidth={0}
                                rounded={'md'}
                                borderColor={'white'}
                                width={100}
                                height={50}
                                fontSize="md"
                                _icon={{ color: '#797979' }}
                                _hover={{ bg: 'transparent', borderWidth: 0, _text: { underline: true }, _icon: { color: 'primary.hovercolor' } }}
                                colorScheme="unstyled" onPress={() => {
                                    setModalVisible(false);
                                }}>
                                Cancel
                            </Button>
                        {type=="cancel modal" ?   <Button
                                bg={'transparent'}
                                _text={{ color: '#797979' }}
                                borderWidth={1}
                                
                                rounded={'md'}
                                borderColor={'#797979'}
                                width={[100,193]}
                                height={50}
                                fontSize="md"
                                _icon={{ color: 'primary.text' }}
                                _hover={{ borderWidth: 0, _icon: { color: 'primary.hovercolor' }, _text: { color: "white" } }}
                                colorScheme="primary"
                                onPress={() => {
                                    setModalVisible(false)
                                    navigate(`/${event.url}/survey`)
                                }}>
                                Confirm
                            </Button> :<></>}
                            {type === "confirm modal" ? (
                                    <Button
                                        bg={'transparent'}
                                        _text={{ color: '#797979' }}
                                        borderWidth={1}
                                        rounded={'md'}
                                        borderColor={'#797979'}
                                        width={[100,193]}
                                        height={50}
                                        fontSize="md"
                                        _icon={{ color: 'primary.text' }}
                                        _hover={{ borderWidth: 0, _icon: { color: 'primary.hovercolor' }, _text: { color: "white" } }}
                                        colorScheme="primary"
                                        onPress={() => {
                                            if (!submittingSurvey && handleSubmit) {
                                                handleSubmit();
                                            }
                                        }}>
                                        {submittingSurvey ?
                                            <Spinner color="black" fontSize="md"/>
                                            : "Confirm Vote"}
                                    </Button>
                                ) : <>
                                </>}
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>

    )
}
