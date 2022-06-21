import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RiLoader5Line } from 'react-icons/ri'
import Displaygiphy from "./displaygiphy";
import Pages from "./pages";

const Giphy = () => {
    const [giphyData, setGiphyData] = useState([])
    const [loader, setLoader] = useState(false)
    const [searchtext, setSearchtext] = useState('')

    const [currentPage, setCurrentpage] = useState(1)
    const [gihpyperpage] = useState(10)
    const indexOfLastGiphy = currentPage * gihpyperpage;
    const indexOfFirstGiphy = indexOfLastGiphy - gihpyperpage;

    const perpageData = giphyData.slice(indexOfFirstGiphy, indexOfLastGiphy)
    const pages = []
    for (let i = 1; i <= Math.ceil(giphyData.length / gihpyperpage); i++) {
        pages.push(i)
    }
    console.log(giphyData)
    useEffect(() => {
        setLoader(true)
        const getdata = async () => {
            await axios.get("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "g0ukClr6vnUFMFwOr1tvrknhTRgDoat0",
                }
            })
                .then((response) => {
                    if (response.data.hasOwnProperty("errors")) {
                        alert(response.errors)
                    }
                    else {
                        setGiphyData(response.data.data)
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
        getdata()
        setLoader(false)
    }, [])

    const formik = useFormik({
        initialValues: {
            search: ''
        },
        validationSchema: Yup.object({
            search: Yup.string().min(2, "Enter atleast 2 characters").required("Please enter any character")
        }),
        onSubmit: (values, { resetForm }) => {
            setSearchtext(values.search)
            const getdata = async () => {
                await axios.get("https://api.giphy.com/v1/gifs/search", {
                    params: {
                        api_key: "g0ukClr6vnUFMFwOr1tvrknhTRgDoat0",
                        q: values.search
                    }
                })
                    .then((response) => {
                        if (response.data.hasOwnProperty("errors")) {
                            alert(response.errors)
                        }
                        else {
                            setGiphyData(response.data.data)
                            resetForm('')
                        }
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            }
            getdata()
            setLoader(false)
        }
    })

    const handleclick = (page) => {
        setCurrentpage(page)
        console.log(page)
    }

    return (
        <div>
            <div className="search-gif">
                <form className="form-control" onSubmit={formik.handleSubmit}>
                    <input className="input-feild"
                        type="text"
                        name='search'
                        value={formik.values.search}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Search Here"
                    />
                    <button type="submit" className="submitbtn">Go</button>
                </form>
                {formik.touched.search && formik.errors.search ? <p className='error-message' style={{ color: 'red' }}>{formik.errors.search}</p> : null}
            </div>
            <div className="searchtext">
                {
                    searchtext ? (<p className="text">Showing result for: {searchtext}</p>) : (<p className="text">Showing trending Giphys</p>)
                }
            </div>
            <Displaygiphy perpageData={perpageData} />
            <Pages pages={pages} handleclick={handleclick} />
        </div>
    )
}

export default Giphy;