import { useRef, Fragment, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { BsQrCode } from 'react-icons/bs';
import { BiReset } from 'react-icons/bi';
import { CiSaveDown1 } from 'react-icons/ci';
import { saveAs } from 'file-saver';
import './App.css';

const App = () => {

  const qrValue = useRef(null);
  const [qrImageUrl, setQrImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [QrDatas, setQrDatas] = useState([]);

  useEffect(() => {
    const focus = (e) => {
      if (e.altKey && e.key === 'l') {
        qrValue.current.focus();
      };
    };
    document.addEventListener('keydown', focus);
    return () => {
      document.removeEventListener('keydown', focus);
    }
  }, []);

  const generate = () => {
    setLoading(true);
    if (qrValue.current.value) {
      setTimeout(() => {
        setQrDatas(
          QRCode.toDataURL(qrValue.current.value)
            .then(url => {
              setQrImageUrl(url);
              setLoading(false);
              qrValue.current.value = '';
            })
            .catch(error => {
              setLoading(false);
              console.error(error);
            })
        );
      }, 1500);
    } else {
      setLoading(false);
      window.alert(`There's nothing to generate 😥. Input something.`);
    }
  };

  const download = () => {

    const confirmDownloading = window.confirm(`Download QR Code?`);

    if (confirmDownloading) {
      if (qrImageUrl) {
        fetch(qrImageUrl)
          .then(response => response.blob())
          .then(blob => {
            saveAs(blob, 'qr-code.png');
          })
          .catch(error => console.error(error))
      } else {
        window.alert('No QR code to save. Generate a QR code first.');
      }
    }
  }


  const keyPress = (e) => {
    if (e.key === 'Enter') {
      generate();
    };
  };

  return (
    <Fragment>
      <div className='display' >
        <input ref={qrValue} className='qrcode-input' placeholder='Input anything for generating QR Code' onKeyDown={keyPress} />
        <button onClick={generate} className='qrcode-button' title='Generate QR Code'>
          <BsQrCode />
        </button>
        <button onClick={() => window.location.reload()} className='reset-button'>
          <BiReset />
        </button>
        {
          QrDatas.length !== 0 ? <button onClick={download} title='Download QR Code' className='save-button'>
            <CiSaveDown1 />
          </button> : null
        }
      </div>
      <div className='qrcode-div'>
        {
          loading ? <p>Generating Your QR Code Please Wait...</p> :
            <Fragment>
              {
                QrDatas.length === 0 ? <p>Qr code will show here</p> :
                  qrImageUrl && <img src={qrImageUrl} alt='qr code' draggable='true' title={qrValue.current.value} />
              }
            </Fragment>
        }
      </div>
    </Fragment>
  )
}

export default App;