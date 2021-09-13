import React ,{useCallback ,useState }from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Image = styled.input`
  display: none;
`;

const Submitbutton = styled.button`
  width: 40%;
  margin-left: 40%;
  margin-right: 40%;
  position: absolute;
  bottom: 12%;
`;

const Label = styled.label`
  position: absolute;
  top: 20%;
  text-align: center;
  height: 9%;
  width: 70%;
  cursor: pointer;
  background: white;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Preview = styled.img`
  position: absolute;
  object-fit: cover;
  top: 40%;
  border-radius: 50%;
  height: 20%;
  width: calc(100vh*0.14);
`;

function Userimage(props) {
  const [fileUrl, setFileUrl] = useState(null)

  const selectImage = useCallback((e) => {
    const selectedImage = e.target.files[0]
    setFileUrl(selectedImage)
  }, [])

  const createFormData = () => {          //add
    const formData = new FormData()
    if (!fileUrl) {
      formData.append('user[img]', '')
      return formData
    }                  //labelがundefinedの場合早期リターン
    formData.append('user[img]', fileUrl) // ポイント1！
    return formData
  }

  const sendFormData = async () => {      // ポイント2！
    
    const data = await createFormData()   //formdataが作成されるのを待つ
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    setTimeout(() => {axios.put(`/api/v1/users/${props.user.id}`, data, config)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })},1000)

  }
  
  
  
    return (
        <>
            <Label htmlFor="file_upload">
                ファイルを選択
          <Image type="file" accept="image/*" id="file_upload" onChange={(event) => {selectImage(event)}} />
            </Label>
            {
              fileUrl && (
              <Preview src={URL.createObjectURL(fileUrl)} />
              )}
        <Submitbutton onClick={() => { sendFormData(); setFileUrl(null); props.reload(); props.setModalshow(false); setTimeout(() => { for (var i = 0; i < 10; i++) { props.setIscha(i) } },1100) }}>提出</Submitbutton>
        </>
    )
}



export default Userimage
