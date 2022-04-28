import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  deleteProductAction,
  sendProductAction,
  editProductAction,
} from "redux/actions/products.action";
import { getCategory } from "redux/actions/category.action";
import ReactPaginate from "react-paginate";
import { Dialog, Transition } from "@headlessui/react";
import { RiCloseCircleFill } from "react-icons/ri";
import toast from "react-hot-toast";
import http from "services/http.service";
import { URL_FILES, URL_PRODUCTS, URL_UPLOAD } from "configs/variables.config";
import Creatable from "react-select/creatable";
import { getProd } from "api/products.api";
import { AiOutlineMinusCircle } from "react-icons/ai";

function Products() {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [itemId, setItemId] = useState(1);
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState();
  const [imageNameEdit, setImageNameEdit] = useState();
  const [itemForEdit, setItemForEdit] = useState({});
  const [itemForDelete, setItemForDelete] = useState();
  const [itemForEditCategory, setItemForEditCategory] = useState();
  const [thumbnailForEdit, setThumbnailForEdit] = useState();
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.productsState);
  const categoryData = useSelector((state) => state.categoryState);
  const totalLength = productsData.total / 10;
  const productsList = productsData.products;

  useEffect(() => {
    dispatch(getProduct(page, 10));
    dispatch(getCategory());
  }, [page, dispatch]);

  // useEffect(() => {
  //   if (itemForEdit.thumbnail) {
  //     http
  //       .get(`/files/${itemForEdit.thumbnail}`)
  //       // .then((resp) => setThumbnailForEdit(resp))
  //       // .then((resp) => console.log(resp))
  //       .catch((error) => console.log(error));
  //   } else {
  //     return;
  //   }
  // }, [itemForEdit.thumbnail]);

  const handleClickPage = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };

  function closeModalAdd() {
    setIsOpenModalAdd(false);
    setImage(null);
  }
  function closeModalEdit() {
    setIsOpenModalEdit(false);
  }
  function closePopup() {
    setIsOpenPopup(false);
  }

  function openModalAdd() {
    setIsOpenModalAdd(true);
  }
  function openModalEdit(item) {
    setIsOpenModalEdit(true);
  }
  async function openPopup(item) {
    setIsOpenPopup(true);
    setItemId(item.id);
    const response = await http.get(`${URL_PRODUCTS}/${item.id}`);
    setItemForDelete(response.data);
  }

  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSendImageToServer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    if (image) {
      const response = await http.post(URL_UPLOAD, formData, {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload Progress:",
            (ProgressEvent.loaded / ProgressEvent.total) * 100 + "%"
          );
        },
      });
      setImageName(response.data.filename);

      toast.success("عکس با موفقیت بارگذاری شد");
    } else {
      toast.error("عکس بارگذاری نشده است");
    }
  };

  const handleSendProductToServer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (image && data) {
      const findCategory = categoryData.category.find(
        (item) => item.name === data.category
      );
      console.log(data.category);
      const idCategory = findCategory.id;
      data.category = idCategory;
      data.thumbnail = imageName;
      dispatch(sendProductAction(data));
      closeModalAdd();
      toast.success("کالا با موفقیت اضافه شد");
    } else {
      toast.error("لطفا تمامی ‌فیلد‌ ها را پر کنید");
    }
  };

  const handleDeleteItemFromServer = () => {
    dispatch(deleteProductAction(itemId));
    closePopup();
  };

  ///work here
  const handleGetProductForEdit = async (item) => {
    openModalEdit();
    const product = { ...item };
    const findCategory = options.find(
      (category) => category.id === product.category
    );
    setItemForEdit(product);
    setItemForEditCategory(findCategory.label);
    setThumbnailForEdit(product.thumbnail);
  };

  const handleUploadImageEdit = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSendImageToServerEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    if (image) {
      const response = await http.post(URL_UPLOAD, formData, {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload Progress:",
            (ProgressEvent.loaded / ProgressEvent.total) * 100 + "%"
          );
        },
      });
      setImageNameEdit(response.data.filename);
      await dispatch(
        editProductAction(itemForEdit.id, { thumbnail: response.data.filename })
      );
      setThumbnailForEdit(response.data.filename);
      toast.success("عکس با موفقیت بارگذاری شد");
    } else {
      toast.error("عکس بارگذاری نشده است");
    }
  };

  const handleEditDetailProductForSendToServer = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    const findCategory = options.find(
      (category) => category.label === data.category
    );
    const defaultCategory = options.find(
      (category) => category.label === itemForEditCategory
    );
    const finalResault = {
      ...data,
      category: findCategory ? findCategory.id : defaultCategory.id,
      // thumbnail: thumbnailForEdit ? thumbnailForEdit : imageNameEdit,
    };
    await dispatch(editProductAction(itemForEdit.id, finalResault));
    closeModalEdit();
    toast.success("کالا با موفقیت به روز رسانی شد");
  };
  ///

  const handleImageEditProductsToServer = async (e) => {
    e.preventDefault();
    await dispatch(editProductAction(itemForEdit.id, { thumbnail: "" }));
  };

  const options = [
    {
      value: "دسته بندی را انتخاب نمایید",
      label: "دسته بندی را انتخاب نمایید",
      id: 0,
    },
    { value: "کالاهای اساسی", label: "کالاهای اساسی", id: 1 },
    { value: "لبنیات", label: "لبنیات", id: 2 },
    { value: "افزودنی‌ها", label: "افزودنی‌ها", id: 3 },
    { value: "حبوبات", label: "حبوبات", id: 4 },
    { value: "نوشیدنی‌ها", label: "نوشیدنی‌ها", id: 5 },
    { value: "میوه و سبزیجات", label: "میوه و سبزیجات", id: 6 },
  ];

  return (
    <div className="mx-44 rounded-lg">
      <div className={"flex items-center justify-between relative -mt-2"}>
        <h1 className={"text-2xl font-semibold overflow-hidden"}>
          مدیریت کالاها
        </h1>
        <button
          className={
            "border rounded-lg px-4 py-2 text-white bg-sky-500 focus:outline-none"
          }
          tabIndex="-1"
          onClick={openModalAdd}
        >
          افزودن کالا
        </button>
      </div>
      {/* Modal Add */}
      <Transition appear show={isOpenModalAdd} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-[1px] overflow-hidden"
          onClose={closeModalAdd}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between ml-3"
                >
                  <span>افزودن کالا</span>
                  <button
                    onClick={closeModalAdd}
                    className={"text-rose-500 text-2xl"}
                  >
                    <RiCloseCircleFill />
                  </button>
                </Dialog.Title>
                <div className="mt-12">
                  <form
                    className={"text-right"}
                    onSubmit={handleSendImageToServer}
                  >
                    <div>
                      <p className={"text-[1rem] font-semibold"}>
                        تصویر کالا :
                      </p>
                      <input
                        type="text"
                        name="thumbnail"
                        id="thumbnail"
                        value={image ? image.name : ""}
                        className={
                          "border w-64 mt-1 px-2 py-1 rounded-lg focus:outline-blue-300"
                        }
                        disabled
                      />
                      <input
                        type="file"
                        name="file"
                        id="file"
                        className={
                          "absolute text-transparent top-[7.8rem] right-[21rem] opacity-0 hover:cursor-pointer"
                        }
                        onChange={handleUploadImage}
                      />
                      <button
                        className={
                          "px-4 py-2 bg-sky-500 text-white rounded-lg mr-7 cursor-pointer z-20"
                        }
                      >
                        افزودن تصویر
                      </button>
                      <button
                        className={
                          "px-4 py-2 bg-sky-500 text-white rounded-lg cursor-pointer z-20 mt-5 mr-72"
                        }
                      >
                        ذخیره تصویر
                      </button>
                    </div>
                  </form>
                  <form
                    className="text-right"
                    onSubmit={handleSendProductToServer}
                  >
                    <div className={"mt-5"}>
                      <p className={"text-[1rem] font-semibold"}>نام کالا :</p>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className={
                          "border w-96 mt-1 px-2 py-1 rounded-lg focus:outline-blue-300"
                        }
                      />
                    </div>
                    <div className={"mt-5"}>
                      <p className={"text-[1rem] font-semibold"}>نام برند :</p>
                      <input
                        type="text"
                        name="brand"
                        id="brand"
                        className={
                          "border w-96 mt-1 px-2 py-1 rounded-lg focus:outline-blue-300"
                        }
                      />
                    </div>
                    <div
                      className={"mt-5 flex items-center justify-between w-96"}
                    >
                      <div>
                        <p className={"text-[1rem] font-semibold"}>
                          قیمت کالا :
                        </p>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          className={
                            "border w-44 mt-1 px-2 py-1 rounded-lg focus:outline-blue-300"
                          }
                        />
                      </div>
                      <div>
                        <p className={"text-[1rem] font-semibold"}>
                          تعداد کالا :
                        </p>
                        <input
                          type="number"
                          name="count"
                          id="count"
                          className={
                            "border w-44 mt-1 px-2 py-1 rounded-lg focus:outline-blue-300"
                          }
                        />
                      </div>
                    </div>
                    <div className={"mt-5 w-96"}>
                      <p className={"text-[1rem] font-semibold mb-2"}>
                        دسته بندی :
                      </p>
                      <Creatable
                        name="category"
                        key="category"
                        isClearable
                        isCreatable
                        isMulti
                        options={options}
                        placeholder={options[0].label}
                      />
                    </div>
                    <div className={"mt-5"}>
                      <p className={"text-[1rem] font-semibold"}>توضیحات :</p>
                      <textarea
                        className={
                          "w-96 px-3 py-2 resize-none mt-1 border rounded-lg focus:outline-blue-300"
                        }
                        rows="5"
                        name="description"
                        id="description"
                      ></textarea>
                    </div>
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-sky-500 border border-transparent rounded-lg mt-5 mr-40"
                      type="submit"
                    >
                      ذخیره
                    </button>
                  </form>
                </div>

                <div className="mt-4"></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Modal Add */}
      {/* Modal Edit */}
      <Transition appear show={isOpenModalEdit} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-[1px] overflow-hidden"
          onClose={closeModalEdit}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between ml-3"
                >
                  <span>ویرایش کالا</span>
                  <button
                    onClick={closeModalEdit}
                    className={"text-rose-500 text-2xl"}
                    tabIndex="-1"
                  >
                    <RiCloseCircleFill />
                  </button>
                </Dialog.Title>
                <div className="mt-12">
                  <form
                    className={"text-right"}
                    onSubmit={handleSendImageToServerEdit}
                  >
                    <div>
                      <p className={"text-[1rem] font-semibold"}>
                        تصویر کالا :
                      </p>
                      <div className="border w-96 h-32 p-5 rounded-md my-2 relative">
                        {itemForEdit.thumbnail ? (
                          <button
                            className="text-rose-600 text-lg absolute top-2 right-[3.2rem]"
                            onClick={handleImageEditProductsToServer}
                          >
                            <RiCloseCircleFill />
                          </button>
                        ) : (
                          ""
                        )}
                        {itemForEdit.thumbnail ? (
                          <img
                            src={`http://localhost:3002/files/${itemForEdit.thumbnail}`}
                            alt={
                              thumbnailForEdit
                                ? thumbnailForEdit
                                : "productImage"
                            }
                            className={"w-20 border rounded-md p-1"}
                          />
                        ) : (
                          <p>عکس محصول وجود ندارد یا حذف شده است</p>
                        )}
                      </div>
                      <div className="relative mt-2 ">
                        <input
                          type="file"
                          name="file"
                          id="file"
                          className={
                            "absolute text-transparent top-[0.8rem] right-[9.3rem] opacity-0 hover:cursor-pointer"
                          }
                          onChange={handleUploadImageEdit}
                        />
                        <button
                          className={
                            "px-4 py-2 bg-sky-500 text-white rounded-lg mr-36 mt-2 cursor-pointer z-20"
                          }
                          tabIndex="-1"
                        >
                          افزودن تصویر
                        </button>
                        <button
                          className={
                            "px-4 py-2 bg-sky-500 text-white rounded-lg mr-36 mt-2 cursor-pointer z-20"
                          }
                          tabIndex="-1"
                        >
                          ذخیره تصویر
                        </button>
                      </div>
                    </div>
                  </form>
                  <form
                    className="text-right"
                    onSubmit={handleEditDetailProductForSendToServer}
                  >
                    <div className={"mt-5"}>
                      <p className={"text-[1rem] font-semibold"}>نام کالا :</p>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className={
                          "border border-gray-300 w-96 mt-1 px-2 py-1 rounded-lg focus:outline-blue-300"
                        }
                        defaultValue={itemForEdit.title}
                      />
                    </div>
                    <div className={"mt-5"}>
                      <p className={"text-[1rem] font-semibold"}>نام برند :</p>
                      <input
                        type="text"
                        name="brand"
                        id="brand"
                        className={
                          "border border-gray-300 w-96 mt-1 px-2 py-1 rounded-lg focus:outline-blue-300"
                        }
                        defaultValue={itemForEdit.brand}
                      />
                    </div>
                    <div className={"mt-5 w-96"}>
                      <p className={"text-[1rem] font-semibold mb-2"}>
                        دسته بندی :
                      </p>
                      <Creatable
                        name="category"
                        key="category"
                        isClearable
                        isCreatable
                        isMulti
                        options={options}
                        defaultInputValue={itemForEditCategory}
                      />
                    </div>
                    <div className={"mt-5"}>
                      <p className={"text-[1rem] font-semibold"}>توضیحات :</p>
                      <textarea
                        id="description"
                        name="description"
                        className={
                          "w-96 px-3 py-2 resize-none mt-1 border border-gray-300 rounded-lg focus:outline-blue-300"
                        }
                        rows="5"
                        placeholder={
                          itemForEdit.description
                            ? ""
                            : "توضیحاتی جهت نمایش وجود ندارد"
                        }
                        defaultValue={
                          itemForEdit.description ? itemForEdit.description : ""
                        }
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-sky-500 border border-transparent rounded-lg mt-5 mr-36"
                    >
                      به روز رسانی
                    </button>
                  </form>
                </div>

                <div className="mt-4"></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Modal Edit */}
      {/* Delete */}
      <Transition appear show={isOpenPopup} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-[1px] overflow-hidden"
          onClose={closePopup}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="shadow-xl inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between ml-3"
                >
                  {itemForDelete
                    ? `آیا کالا با عنوان ${itemForDelete.title} ${itemForDelete.brand} حذف شود ؟`
                    : ""}
                </Dialog.Title>
                <div className="">
                  <form className={"text-right"}>
                    <div className={"flex items-center justify-end"}>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium focus:outline-none text-white bg-rose-500 border border-transparent rounded-lg mt-5 ml-5"
                        onClick={closePopup}
                      >
                        خیر
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-sky-500 focus:outline-none border border-transparent rounded-lg mt-5"
                        onClick={() => handleDeleteItemFromServer()}
                      >
                        بله
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-4"></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Delete */}
      <table
        className={"border mt-6 text-center w-full shadow-2xl border-collapse"}
      >
        <thead className={"border bg-gray-300"} id={"mmd"}>
          <tr>
            <td className={"border py-3 px-6"}>تصویر</td>
            <td className={"border w-2/5"}>نام کالا</td>
            <td className={"border w-2/5"}>دسته بندی</td>
            <td className={"border"}>...</td>
          </tr>
        </thead>
        <tbody>
          {!!productsList.length &&
            productsList.map((items) => {
              return (
                <tr
                  className={"hover:bg-gray-100"}
                  key={items.id}
                  id={items.id}
                >
                  <td
                    className={
                      "border border-gray-300 flex justify-center items-center"
                    }
                  >
                    <img
                      src={`http://localhost:3002/files/${items.thumbnail}`}
                      alt=""
                      className={"w-10"}
                    />
                  </td>
                  <td className={"border border-gray-300"}>
                    {`${items.title} ${items.brand}`}
                  </td>
                  <td className={"border border-gray-300"}>
                    {categoryData.category.length > 0 &&
                      categoryData.category.find(
                        (item) => item.id === items.category
                      ).name}
                  </td>
                  <td className={"border border-gray-300"}>
                    <button
                      className={"p-2 text-sky-400 focus:outline-none"}
                      onClick={() => handleGetProductForEdit(items)}
                      tabIndex="-1"
                    >
                      ویرایش
                    </button>
                    <button
                      className={"p-2 text-sky-400 focus:outline-none"}
                      tabIndex="-1"
                      onClick={() => openPopup(items)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ReactPaginate
        onPageChange={handleClickPage}
        pageCount={totalLength / 1}
        nextLabel={""}
        previousLabel={""}
        renderOnZeroPageCount={null}
        containerClassName={
          "flex items-center justify-center pt-12 w-96 m-auto"
        }
        pageClassName={"pt-1 px-2 mx-1 border border-sky-500 rounded-[50%]"}
      />
    </div>
  );
}

export { Products };
