const arr = [
  {
    name: "陆地动物",
    id: 1,
    list: [
      {
        name: "cat",
        image: "https://img01.yzcdn.cn/vant/cat.jpeg",
        width: 0,
        height: 0,
      },
    ],
  },
  {
    name: "水生动物",
    id: 2,
    list: [
      {
        name: "fish",
        image:
          "https://ts1.cn.mm.bing.net/th/id/R-C.fb13b130455ebf689369ae3cd4b4aea3?rik=uTwnSJhKk8uYXg&riu=http%3a%2f%2fpic.baike.soso.com%2fp%2f20131220%2f20131220202949-446000315.jpg&ehk=OWAQKTu6BOncU3TQcuPF%2br4zk%2bTEKf%2bIKHAoFJQUPZ0%3d&risl=&pid=ImgRaw&r=0",
        width: 0,
        height: 0,
      },
    ],
  },
];

function getImgSize(arr) {
  return arr.map((i) => {
    i.list = list = i.list.map((j) => {
      const image = new Image();
      image.src = j.image;
      image.onload = function () {
        j.width = image.width;
        j.height = image.height;
      };

      return j;
    });

    return i;
  });
}

async function getImgSize2(arr) {
  return await Promise.all(
    arr.map(async (item) => {
      return {
        ...item,
        list: await Promise.all(
          item.list.map(
            async (_item_) =>
              await new Promise((resolve) => {
                const img = new Image();
                img.src = _item_.image;
                img.addEventListener("load", () => {
                  resolve({
                    ..._item_,
                    width: img.width,
                    height: img.height,
                  });
                });
              })
          )
        ),
      };
    })
  );
}

async function getImgSize3(arr) {
  for (const item of arr) {
    for (const imgList of item.list) {
      const { width, height } = await new Promise((resolve) => {
        const img = new Image();
        img.onload = (e) => {
          const width = e.target.naturalWidth;
          const height = e.target.naturalHeight;
          resolve({
            width,
            height,
          });
        };
        img.src = imgList.image;
      });

      imgList.width = width;
      imgList.height = height;
    }
  }

  return arr;
}

const newArr = getImgSize(arr);
console.log("newArr", newArr);

const newArr2 = getImgSize2(arr);
newArr2.then((res) => {
  console.log("newArr2", res);
});

const newArr3 = getImgSize3(arr);
newArr3
  .then((res) => {
    console.log("newArr3", res);
  })
  .catch((e) => {
    console.log("e", e);
  })
  .finally(() => {});
