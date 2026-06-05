import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import { useEffect, useMemo, useState } from "react";
import { useStyles } from "./DisplayPriceCss";
import DeleteIcon from '@mui/icons-material/Delete';


import { IconButton, Tooltip } from "@mui/material";


import Swal from "sweetalert2";
import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from "react-router";



export default function DisplayPrice() {
    var classes = useStyles();
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [openStatus, setOpenStatus] = useState(false);
    const [rowData, setRowData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [iconOpenStatus, setIconOpenStatus] = useState(false);
    const [categoryList, setCategoryList] = useState([])
    const [priceList, setPriceList] = useState([])
    const navigate = useNavigate();

    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_all_category")
        setCategoryList(res.data)
    }
    useEffect(() => {
        fetchAllCategory()
    }, [])

    useEffect(() => {
        fetchSubcategoryData();
    }, []);



    const fetchSubcategoryData = async () => {
        var res = await getData("subcategory/fetch_all_subcategory");
        if (res.status) {
            setSubcategoryList(res.data);
        } else {
            alert(res.message);
        }
    };

    useEffect(() => {
        fetchPricesData()
    }, []);
    useEffect(() => {
        fetchPricesData()
    }, [refresh]);


    const fetchPricesData = async () => {
        const res = await getData("pricing/fetch_all_price");
        if (res && res.status) { // Check if res exists before checking .status
            setPriceList(res.data);
        } else {
            console.error("Fetch failed or server down");
            setPriceList([]); // Keep list empty instead of crashing
        }
    };

    const handleEdit = (row) => {
        // alert(JSON.stringify(row))
        setRowData(row.original)
        setOpenStatus(true)
        // setIconOpenStatus(true)
    }

    const handleDelete = async (row) => {
        // 1. Show the confirmation dialog FIRST
        Swal.fire({
            title: `Are you sure to delete the seleceted subcategory ${row.original.subcategoryname}`,
            icon: 'warning',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',

            showCancelButton: true,

            confirmButtonText: "Delete",
        }).then(async (result) => {
            // 2. Only if the user clicked "Yes, delete it!"
            if (result.isConfirmed) {
                var body = { priceid: row.original.priceid };

                // 3. Make the API call inside this block
                var res = await postData("pricing/delete_price", body);

                if (res.status) {
                    Swal.fire("Deleted!", `${row.original.subcategoryname} has been deleted.`, "success");
                    setRefresh(!refresh); // Trigger list refresh
                } else {
                    Swal.fire("Error!", "Failed to delete the city.", "error");
                }
            }
        });
    };

    const handleEditIcon = (row) => {
        // alert(JSON.stringify(row))
        setRowData(row.original)
        // setOpenStatus(true)
        setIconOpenStatus(true)
    }


    const showSubcategory = () => {
        return <MaterialReactTable
            columns={[
                { accessorKey: "priceid", header: "PriceId", size: 100 },
                { accessorKey: "categoryname", header: "CategoryName", size: 100 },
                { header: "SubCategoryName", accessorKey: "subcategoryname" },
                { header: "typeofservice", accessorKey: "typesofservices" },
                { header: "Amount", accessorKey: 'amount' },
                { header: "Offer", accessorKey: 'offer' },
                { header: "Time", accessorKey: 'time_services' },

                // ... your other columns
                {
                    header: "Description",
                    accessorKey: 'discription',
                    // Custom cell renderer to parse the HTML tags
                    Cell: ({ cell }) => (
                        <div
                            dangerouslySetInnerHTML={{ __html: cell.getValue() }}
                        />
                    ),
                },

                { header: "Image", Cell: ({ renderedCellValue, row }) => <div><img src={`${serverURL}/images/${row.original.picture}`} style={{ width: 40 }} /></div> },
            ]}
            data={priceList}
            renderTopToolbarCustomActions={() => {
                return (
                    <div style={{ display: "flex", justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '-1px' }}>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column"
                            }}>
                            {/* <img src="/logo.png" className={classes.imageStyle} /> */}
                            <span className={classes.haedingText}>Price List</span>

                        </div>
                        <IconButton

                            onClick={() => {
                                // Logic to open a modal or add a row
                                navigate('/dashboard/pricing')
                            }}
                        >
                            <Tooltip title="Add New price">
                                <AddIcon />
                            </Tooltip>

                        </IconButton>
                    </div>
                )
            }}
            enableRowActions
            positionActionsColumn="last"

            renderRowActions={({ row, table }) => {
                return (
                    <div style={{ display: "flex", gap: "5px" }}>

                        <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(row)}>
                                < DeleteIcon color="error" />
                            </IconButton>
                        </Tooltip>
                    </div>
                );

            }}
        />;
    };
    return (
        <div className={classes.root}>
            <div className={classes.box}>{showSubcategory()}</div>




        </div>
    );
}

