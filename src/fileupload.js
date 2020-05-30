import React, { useRef, useState } from 'react';
import axios from 'axios';

function FileUpload() {

    const [file, setFile] = useState('');
    const [data, getFile] = useState({ name: "", path: "" });
    const [response,setResponse] = useState([])
    const [progress, setProgess] = useState(0);
    const [ countData,setCountData ] = useState(1)
    const el = useRef();

    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]
        console.log(file);
        setFile(file)
    }

    const textChange = e => setCountData(e.target.value)

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file)
        axios.post('http://localhost:4500/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress)
            }
        }).then(res => {
            console.log(res.data.data);
            setResponse(res.data.data)
            // el.current.value = "";
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />
                <div className="progessBar" style={{ width: progress }}>{progress}</div>
                <button onClick={uploadFile} className="upbutton">upload</button>
            </div>
            <div>
                <input value={countData} type="text" onChange={textChange}/>
            </div>
            <table>
                <tbody>
                    { response.length > 0 && response.slice(0,countData).map(data => {
                        return(
                            <tr>
                                {
                                    data.split('|').map( item => <td>{item}</td>)
                                }

                            </tr>    
                        )
                    }) }
                </tbody>    
            </table>
           

        </div>
    );
}

export default FileUpload;
