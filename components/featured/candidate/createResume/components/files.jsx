import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { reCallUserData } from '../../../../../Redux/actions/user';
import { useDispatch } from 'react-redux';
import ClientFolders from './clientFolders';
import MyFolders from './MyFolders';

function Files({ setIsMove,isMove,isList, tabIndex, setTabIndex, data, setData, setFolderData, files, setFiles, clientData, setClientData, tab, select, setSelect, selectedIndexes, setSelectedIndexes }) {
   
    const [clientId, setClientId] = useState()

    const [clientResumes, setClientResumes] = useState()
    const dispatch = useDispatch();

    const openFolder = (index, item) => {

        setClientId(data[index]._id);
        setFolderData(data[index]);
        setTabIndex(1);

    };
    const openClientFolder = (index) => {

        setClientId(clientData[index]._id);
        setFolderData(clientData[index]);
        setTabIndex(1);

    };
    const toggleSelect = (index) => {
        if (selectedIndexes.includes(index)) {
            setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
        } else {
            setSelectedIndexes([...selectedIndexes, index]);
        }
    };

    useEffect(() => {
        if (clientId) {
            axios
                .get("https://freedygoservices.in/api/resume/" + clientId)
                .then((res) => {

                    setClientResumes(res.data.data);
                    setFiles(res.data.data.map(file => ({
                        ...file,
                        fileExtension: file.resumeUrl.split('.').pop()
                    })));


                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [clientId, tab, tabIndex]);

    return (
        <>
            {tab === 1 &&
                <MyFolders setIsMove={setIsMove} isMove={isMove} isList={isList} selectedIndexes={selectedIndexes} setSelectedIndexes={setSelectedIndexes} setSelect={setSelect} select={select} setTabIndex={setTabIndex} setFolderData={setFolderData} tabIndex={tabIndex} data={data} setData={setData} files={files} setFiles={setFiles} clientData={clientData} setClientData={setClientData} tab={tab} openFolder={openFolder} toggleSelect={toggleSelect} />
            }
            {tab === 0 &&
                <ClientFolders isList={isList} selectedIndexes={selectedIndexes} setSelectedIndexes={setSelectedIndexes} setSelect={setSelect} select={select} setTabIndex={setTabIndex} setFolderData={setFolderData} tabIndex={tabIndex} data={data} setData={setData} files={files} setFiles={setFiles} clientData={clientData} setClientData={setClientData} tab={tab} openClientFolder={openClientFolder} toggleSelect={toggleSelect} />
            }
        </>
    )
}

export default Files
