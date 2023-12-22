import { Html5QrcodeScanner } from 'html5-qrcode';
import { Fragment, useState, useEffect, useRef } from 'react';
import { MdContentCopy } from "react-icons/md";

const Reader = () => {
    const [scanResult, setScanResult] = useState(null);
    const textRef = useRef(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5,
        });

        const succes = (result) => {
            scanner.clear();
            setScanResult(result);
        }

        const error = (err) => {
            console.warn(err);
        }
        scanner.render(succes, error);

    }, []);

    const copy = () => {
        const textToCopy = textRef.current.innerText;
        const dummyElement = document.createElement('textarea');
        document.body.append(dummyElement);
        dummyElement.value = textToCopy;
        dummyElement.select();
        document.execCommand('copy');
        document.body.removeChild(dummyElement);
        window.alert(`Success`);
    }

    return (
        <Fragment>
            <div className='App'>
                {
                    scanResult ? <div>
                        Success:
                        {
                            scanResult.includes('http') ?
                                <a ref={textRef} style={{ textDecoration: 'underline' }} href={`${scanResult}`} target='blank'>{scanResult}</a> :
                                <p ref={textRef} style={{ textDecoration: 'underline' }}>{scanResult}</p>
                        } <br/>
                        <button onClick={copy} style={{width:'150px'}}>
                            <MdContentCopy/>
                        </button>
                    </div>
                        : <div id='reader'>Something went wrong...</div>
                }
            </div>
        </Fragment>
    )
}

export default Reader;