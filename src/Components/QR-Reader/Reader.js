import { Html5QrcodeScanner } from 'html5-qrcode';
import { Fragment, useState, useEffect } from 'react';

const Reader = () => {
    const [scanResult, setScanResult] = useState(null);

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

    return (
        <Fragment>
            <div className='App'>
                {
                    scanResult ? <div>
                        Success:
                        {scanResult.includes('http') ?
                            <a href={`${scanResult}`} target='blank'>{scanResult}</a> : <p>{scanResult}</p>
                        }                        </div>
                        : <div id='reader'>Something went wrong...</div>
                }
            </div>
        </Fragment>
    )
}

export default Reader;