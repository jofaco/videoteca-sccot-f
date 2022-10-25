import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import Select from "react-select";
import * as VideoServer from "../../services/videoServer";
import * as CategoriaServer from "../../services/category";
//components
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const VideoForm = () => {
  const history = useNavigate();
  const params = useParams();

  /* const options2 = [
    { value: "1" , label: "Español"},
    { value: "2" , label: "Ingles"}
  ];*/

  const initialState = {
    id: 0,
    code_esp: "",
    code_engl: "",
    title_espanol: "",
    title_english: "",
    title_cap_esp: "",
    title_cap_english: "",
    description_esp: "",
    description_english: "",
    tipe_of_video: 1,
    languages: [1],
    categorias: [1],
  };

  const [selectedFile, setSelectedFile] = useState();
  const [video, setVideo] = useState(initialState);
  const [categorias, setCategorias] = useState();

  const handleSelectIdioma = (e) => {
    let target = e.target;
    let name = target.name;

    let value = Array.from(target.selectedOptions, (option) => option.value);
    setVideo({ ...video, [name]: value });
  };
  const handleSelectCategory = (e) => {
    let target = e.target;
    let name = target.name;
    //here
    let value = Array.from(target.selectedOptions, (option) => option.value);
    setVideo({ ...video, [name]: value });
  };
  const handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;
    if (name === "image") {
      setSelectedFile(e.target.files[0]);
    } else {
      setVideo({ ...video, [name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var featured_image = selectedFile;
    const formData = new FormData();

    try {
      //let res;
      formData.append("code_esp", video.code_esp);
      formData.append("code_engl", video.code_engl);
      formData.append("title_espanol", video.title_espanol);
      formData.append("title_english", video.title_english);
      formData.append("title_cap_esp", video.title_cap_esp);
      formData.append("title_cap_english", video.title_cap_english);
      formData.append("description_esp", video.description_esp);
      formData.append("description_english", video.description_english);
      formData.append("featured_image", featured_image);
      formData.append("tipe_of_video", video.tipe_of_video);
      for (let i = 0; i <= video.languages.length - 1; i++) {
        formData.append("languages", video.languages[i]);
      }
      for (let i = 0; i <= video.categorias.length - 1; i++) {
        formData.append("categorias", video.categorias[i]);
      }
      let res;
      if (!params.id) {
        res = await VideoServer.RegisterVideo(formData);
      } else {
        res = await VideoServer.UpdateVideo(params.id, formData);        
      }
      console.log(res);
      history("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const getVideo = async (videoID) => {
    try {
      const res = await VideoServer.getVideoDT(videoID);
      const data = await res;
      const {
        code_esp,
        code_engl,
        title_espanol,
        title_english,
        title_cap_esp,
        title_cap_english,
        description_esp,
        description_english,
        tipe_of_video,
        languages,
        categorias,
      } = data;

      setVideo({
        code_esp,
        code_engl,
        title_espanol,
        title_english,
        title_cap_esp,
        title_cap_english,
        description_esp,
        description_english,
        tipe_of_video,
        languages,
        categorias,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCategorias = async () => {
    try {
      const res = await CategoriaServer.ListCategorias();
      const data = await res;
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorias();
    if (params.id) {
      getVideo(params.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (categorias) {
    return (
      <div className="col-md-6 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="tipeOfVideo">
              Tipo de video
            </label>
            <Select
              className="form-select"
              labelId="tipe_of_video"
              id="tipe_of_video"
              name="tipe_of_video"
              value={video.tipe_of_video}
              label="tipe_of_video"
              onChange={handleInputChange}
            >
              <MenuItem value={1}>Pelicula</MenuItem>
              <MenuItem value={2}>Serie</MenuItem>
            </Select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="languages">
              Idiomas del video
            </label>
            <select
              className="form-select"
              id="languages"
              name="languages"
              value={video.languages || null}
              onChange={handleSelectIdioma}
              aria-label="languages"
              multiple={true}
              required
            >
              <option value="1">Español</option>
              <option value="2">Ingles</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="categorias">
              Categorias del video
            </label>
            <Select
              className="form-select"
              id="categorias"
              name="categorias"
              value={video.categorias || null}
              onChange={handleSelectCategory}
              aria-label="categorias"
              multiple
              native
              required
            >
              {categorias.map((categ, index) => (
                <option key={index} value={categ.id}>
                  {categ.categoria}
                </option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="codeEsp">
              Código vimeo del video en español
            </label>
            <input
              className="form-control"
              id="code_esp"
              name="code_esp"
              value={video.code_esp || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Código del video en español"
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="codeEngl">
              Código vimeo del video en ingles
            </label>
            <input
              className="form-control"
              id="codeEngl"
              name="code_engl"
              value={video.code_engl || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Código del video en ingles"
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="titleEspanol">
              Titulo en español
            </label>
            <input
              className="form-control"
              id="titleEspanol"
              name="title_espanol"
              value={video.title_espanol}
              onChange={handleInputChange}
              type="text"
              placeholder="Titulo en español"
              required
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="titleEnglish">
              Titulo en Ingles
            </label>
            <input
              className="form-control"
              id="titleEnglish"
              name="title_english"
              value={video.title_english}
              onChange={handleInputChange}
              type="text"
              placeholder="Titulo en Ingles"
              required
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="titleCapEsp">
              Titulo del capitulo en Español
            </label>
            <input
              className="form-control"
              id="titleCapEsp"
              name="title_cap_esp"
              value={video.title_cap_esp || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Titulo del capitulo en Español"
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="titleCapEnglish">
              Titulo del capitulo en Ingles
            </label>
            <input
              className="form-control"
              id="titleCapEnglish"
              name="title_cap_english"
              value={video.title_cap_english || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Titulo del capitulo en Ingles"
              maxLength="150"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="descriptionEsp">
              Descripción en español
            </label>
            <input
              className="form-control"
              id="descriptionEsp"
              name="description_esp"
              value={video.description_esp || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Descripción en español"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="descriptionEnglish">
              Descripción en ingles
            </label>
            <input
              className="form-control"
              id="descriptionEnglish"
              name="description_english"
              value={video.description_english || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Descripción en ingles"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="featuredImage">
              Imagen para banner
            </label>
            <input
              className="form-control"
              id="featuredImage"
              name="image"
              onChange={handleInputChange}
              type="file"
              placeholder="Imagen para banner"
              required
            />
          </div>
          {/*<div className="mb-3">
          <label className="form-label" htmlFor="minImage">
            Imagen para email
          </label>
          <input className="form-control" id="minImage" name="min_image" value={video.min_image} onChange={handleInputChange} type="file" placeholder="Imagen para email" required/>
        </div> */}

          <div className="d-grid">
            {params.id ? (
              <button
                className="btn btn-primary btn-lg"
                id="submitButton"
                type="submit"
              >
                Update
              </button>
            ) : (
              <button
                className="btn btn-success btn-lg"
                id="submitButton"
                type="submit"
              >
                Guardar
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
};

export default VideoForm;
