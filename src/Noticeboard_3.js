import { useEffect, useRef, useState } from "react";
import './style/css/Noticeboard_1.css';

function Noticeboard_3() {
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");
  const [textColour, setTextColour] = useState("");
  const [files, setFiles] = useState([]);
  const [buttonToggle, setButtonToggle] = useState(false);
  const [buttonToggle2, setButtonToggle2] = useState(false);
  const [buttonToggle3, setButtonToggle3] = useState(false);
  const [buttonToggle4, setButtonToggle4] = useState(false);
  const [buttonsUrls, setButtonUrls] = useState(false);
  const [buttonsUrls2, setButtonUrls2] = useState(false);
  const [buttonsUrls3, setButtonUrls3] = useState(false);
  const [buttonsUrls4, setButtonUrls4] = useState(false);
  const divRef = useRef(null);
  let id = "";

  useEffect(() => {
    async function getIdAndFetchConfig() {
      const url = new URL(window.location.href);
      const param = url.searchParams.get("v");

      const response = await fetch("/api/noticeboard/id/from-url_3", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: param })
      });

      if (!response.ok) {
        window.location.href = "/login";
      } else {
        const data = await response.json();

        id = data.ok;

        fetchUrls(data.ok);
      }

      const response2 = await fetch('/api/noticeboard/config/fetch_3', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (response2.ok) {
        const data = await response2.json();

        setTitle(data.title);
        setTitle2(data.title2);
        setTitle3(data.title3);
        setTitle4(data.title4);
        setTextColour(data.tc);

        if (data.bt === "true") {
          setButtonToggle(true);
        }
        if (data.bt2 === "true") {
          setButtonToggle2(true);
        }
        if (data.bt3 === "true") {
          setButtonToggle3(true);
        } else {
          alert("Noticeboard is disabled, to enable go to /noticeboard/content and press the settings cog to configure the noticeboard.");
          window.history.back();
        }
        if (data.bt4 === "true") {
          setButtonToggle4(true);
        }

        document.body.style.background = data.bc;
      } else {
        const data = await response2.json();
        alert(data.error);
      }

      async function fetchContent() {
        const response = await fetch('/api/noticeboard/fetch_3', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });

        const files = [];
        if (response.ok) {
          const data = await response.json();
          files.push(data.files_array);

          const fileData = [];
          for (const file of files[0]) {
            const response2 = await fetch('/api/noticeboard/fetchfile_3', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ file, id })
            });

            if (response2.ok) {
              const data = await response2.blob();
              const urlObject = URL.createObjectURL(data);

              fileData.push({ name: file, data: urlObject });
            }
          }

          setFiles(fileData);
        } else {
          const data = await response.json();
          alert(data.error);
        }
      }
      fetchContent();

      async function fetchUrls(id) {
        const response3 = await fetch('/api/noticeboard/id/url/fetch', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });

        if (response3.ok) {
          const data = await response3.json();

          setButtonUrls(data.n1);
          setButtonUrls2(data.n2);
          setButtonUrls3(data.n3);
          setButtonUrls4(data.n4);
        }
      }
    }
    getIdAndFetchConfig();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="header_noticeboard_1" style={{ padding: "30px", display: "flex", justifyContent: "space-between" }}>
        <p className="title-noticeboard_1" style={{ color: textColour }}>{title3}</p>
        <div style={{ display: "flex" }}>
          {
            buttonToggle && (
              <a className="buttons-a" style={{ color: `${textColour}` }} href={`/noticeboard?v=${buttonsUrls.n1}`}>{title}</a>
            )
          }
          {
            buttonToggle2 && (
              <a className="buttons-a" style={{ color: `${textColour}` }} href={`/noticeboard_2?v=${buttonsUrls2.n2}`}>{title2}</a>
            )
          }
          {
            buttonToggle4 && (
              <a className="buttons-a" style={{ color: `${textColour}` }} href={`/noticeboard_4?v=${buttonsUrls4.n4}`}>{title4}</a>
            )
          }
        </div>
      </div>
      <div className="container-div-n" style={{ paddingLeft: "2rem", display: "flex" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", paddingBottom: "100vh" }}>
          {files.map((file, idx) => (
            <div key={idx} className="file" ref={divRef}>
              <img
                id={idx}
                src={file.data}
                title={file.name}
                style={{ border: "0px solid #ffffff", pointerEvents: "none" }}
                onLoad={(e) => {
                  const img = e.target;
                  const isPortrait = img.height > img.width;
                  img.classList.add(isPortrait ? "portrait" : "landscape");

                  e.target.parentElement.classList.add(isPortrait ? "portrait" : "landscape");
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Noticeboard_3;
