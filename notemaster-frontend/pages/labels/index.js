import Navbar from "../../components/Navbar";
import { useState, useEffect, useContext } from 'react';
import Label from "../../components/Labels/Label";
import axios from "axios";
import { url, config } from '../../components/Globals';
import Modal from "../../components/Modal";
import { GlobalContext } from '../../context/GlobalContext';
import Createlabel from '../../components/Labels/Createlabel';
import { useRouter } from "next/router";
import Head from 'next/head';


export default function Labels() {
  const router = useRouter();

  const [labels, setLabels] = useState(undefined);
  const [showEditLabelModal, setShowEditLabelModal] = useState(false);
  const { setShowOverlay, showOverlay, setProgress, setShowManageLabelsModal } = useContext(GlobalContext);
  const [newLabelName, setNewLabelName] = useState("");
  const [targetLabel, setTargetLabel] = useState(undefined);

  const [showCreateLabelModal, setshowCreateLabelModal] = useState(false);

  function openEditLabelModal(label) {
    setShowOverlay(true);
    setShowEditLabelModal(true);
    setTargetLabel(label)
  }

  function openCreateLabelModal() {
    setShowOverlay(true);
    setshowCreateLabelModal(true);
  }
  function closeCreateLabelModal() {
    setShowOverlay(false);
    setshowCreateLabelModal(false);
  }

  async function editLabel() {
    const authToken = localStorage.getItem("authToken");

    const res = await axios.put(url("/api/labels/edit/"), {
      labelId: targetLabel._id.$oid,
      name: newLabelName,
    }, { headers: { authToken } });

    setLabels(labels.map(item => item._id.$oid === targetLabel._id.$oid ? { ...item, name: newLabelName } : item));


  };

  function closeEditLabelModal() {
    setShowEditLabelModal(false); setShowOverlay(false)
  }

  useEffect(() => {
    setProgress(50);
    const authToken = localStorage.getItem(config.authTokenKey);


    axios.get(url("/api/labels/get"), {
      headers: { authToken },
    }).then(res => {
      setLabels(res.data);
      setProgress(100);
    }).catch((error) => {setLabels([]);setProgress(100);})

    setShowOverlay(false);
    setShowManageLabelsModal(false);

  }, []);


  return (
    <>
      <Navbar />
      <Head>
        <title>Labels</title>
      </Head>
      <Createlabel show={showCreateLabelModal} onClose={e => closeCreateLabelModal()} labels={labels} setLabels={setLabels} />

      {labels !== undefined &&
        <>
          <div className={`w-full h-screen fixed top-0 left-0 bg-black`} style={
            showOverlay === true ?
              { opacity: 0.5, pointerEvents: "all" } :
              { opacity: 0, pointerEvents: "none" }
          }></div>

          {labels.length !== 0 && <button className="btn btn-blue mx-3 mt-4" onClick={e => openCreateLabelModal()}><i className="fa fa-plus mr-2"></i>Create label</button>}

          <div className="mt-4 mx-3 flex gap-5 flex-wrap">
            {labels.length === 0 &&
              <p className="bg-red-500 rounded-md p-3 text-white">Oops! You don&apos;t have any labels. <button onClick={e => openCreateLabelModal()}>Click here</button> to create a new label</p>

            }

            {labels.map((label, key) => <Label key={key} label={label} labels={labels} setLabels={setLabels} openEditLabelModal={openEditLabelModal} />)}
          </div>

          <Modal
            header={"Edit label"}
            body={<input className="form-input" placeholder="Enter new name of this label" value={newLabelName} onChange={e => setNewLabelName(e.target.value)} />}
            footer={
              <div className="flex gap-x-3">
                <button className="btn btn-green" onClick={e => editLabel()}><i className="fa fa-save mr-2"></i>Save</button>
                <button className="btn btn-blue" onClick={e => closeEditLabelModal()}>Close</button>
              </div>
            }
            show={showEditLabelModal}
            onClose={e => { closeEditLabelModal() }}
          />
        </>
      }
    </>
  )
}
