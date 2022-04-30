import Images from "assets";
import { PATHS } from "configs/routes.config";

export const CategoriesLink = [
  {
    image: Images.Oil,
    link: PATHS.CATEGORY_BASIC,
    title: "کالاهای‌ اساسی"
  },
  { image: Images.Labaniyat, link: PATHS.CATEGORY_DAIRY, title: "لبنیات" },
  { image: Images.Afzodaniha, link: PATHS.CATEGORY_CONDIMENT, title: "افزودنی‌ها" },
  { image: Images.Beans, link: PATHS.CATEGORY_BEANS, title: "حبوبات" },
  { image: Images.Drinks, link: PATHS.CATEGORY_DRINKS, title: "نوشیدنی‌ها" },
  { image: Images.Fruits, link: PATHS.CATEGORY_FRUITS, title: "میوه و سبزیجات" },
];
