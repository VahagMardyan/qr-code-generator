import './style.css';
import { useRef, Fragment, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { AiOutlineClear } from 'react-icons/ai';
import { BsQrCode } from 'react-icons/bs';
import { BiReset } from 'react-icons/bi';
import { CiSaveDown1 } from 'react-icons/ci';
import { saveAs } from 'file-saver';

const Generate = () => {
  const qrValue = useRef('');
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
            saveAs(blob, `qr-code.png`);
          })
          .catch(error => console.error(error));
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
      <section className='parent-div'>
        <div className='display' >
          <input ref={qrValue} className='qrcode-input' placeholder='Input link or something for generate a QR Code' onKeyDown={keyPress} />
        </div>
        <div className='buttons-block'>
          <button onClick={generate} className='qrcode-button' title='Generate QR Code'>
            <BsQrCode />
          </button>
          <button onClick={() => window.location.reload()} className='reset-button' title='Reset Page'>
            <BiReset />
          </button>
          {
            QrDatas.length !== 0 ?
              <button onClick={download} title='Download QR Code' className='save-button'>
                <CiSaveDown1 />
              </button>
              : null
          }
          {
            qrValue.current.value ?
              <button onClick={() => qrValue.current.value = ''} title='clear input' className='clear-button'>
                <AiOutlineClear />
              </button>
              : null
          }
        </div>
        <div className='qrcode-div'>
          {
            loading ? <p>Generating Your QR Code Please Wait...</p> :
              <Fragment>
                {
                  QrDatas.length === 0 ? <p>Qr code will show here</p> :

                    qrValue.current.value.includes('http')
                      // eslint-disable-next-line react/jsx-no-target-blank
                      ? <a style={{ cursor: 'pointer' }} href={qrValue.current.value} target='_blank'>
                        <img src={qrImageUrl} alt='qr code' draggable='false' />
                      </a>
                      :
                      <img src={qrImageUrl} alt='qr code' draggable='false' title={qrValue.current.value} />
                }
              </Fragment>
          }
        </div>
      </section>
    </Fragment>
  )
}

export default Generate;