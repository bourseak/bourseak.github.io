<template>
  <div class="home">
    <!--    dont show the plans-->
    <div
      class="row row-cols-1 row-cols-md-3 g-4 mt-5 mb-5"
      style="display: none"
    >
      <div class="col">
        <div class="card h-100">
          <img src="@/assets/r2d2.jpeg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">R2D2</h5>
            <p class="card-text" dir="rtl">
              پلن R2D2 کاملا رایگانه. شما با این پنل می‌تونید تا حد اقل
              <b>3 سهم</b>
              رو به واچ لیست اضافه کنید
            </p>
          </div>
          <div class="card-footer">
            <small class="text-body-secondary" dir="rtl">رایگانه (:</small>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100">
          <img src="@/assets/C-3PO.jpeg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">C-3PO</h5>
            <p class="card-text" dir="rtl">
              پلن C-3PO. شما با این پنل می‌تونید تا حد اقل
              <b>5 سهم</b>
              رو به واچ لیست اضافه کنید
            </p>
          </div>
          <div class="card-footer">
            <small class="text-body-secondary" dir="rtl">25,000 تومان</small>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100">
          <img src="@/assets/bb8.jpeg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">BB-8</h5>
            <p class="card-text" dir="rtl">
              پلن BB-8. شما با این پنل می‌تونید تا حد اقل
              <b>10 سهم</b>
              رو به واچ لیست اضافه کنید
            </p>
          </div>
          <div class="card-footer">
            <small class="text-body-secondary" dir="rtl">50,000 تومان</small>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100">
          <img src="@/assets/K-2SO.jpeg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">K-2SO</h5>
            <p class="card-text" dir="rtl">
              پلن K-2SO. شما با این پنل می‌تونید تا حد اقل
              <b>20 سهم</b>
              رو به واچ لیست اضافه کنید
            </p>
          </div>
          <div class="card-footer">
            <small class="text-body-secondary" dir="rtl">90,000 تومان</small>
          </div>
        </div>
      </div>
    </div>

    <p style="direction: rtl; font-size: 25px" class="w-color m-5">
      هدف ما از ارائه این سایت کمک به شما در خرید و فروش نماد های بورسی به قیمت
      های مناسب می‌باشد. که این امر فعلا به دو شکل برای شما فرهم است.
      <br />
      <br />
      1. رسیدن قیمت نماد به قیمتی که شما تعیین می‌کنید برای خرید و یا فروش سهم.
      <br />
      2. حجم خوردن نماد به شکل غیر متعارف که اخطاری برای خرید و یا فروش سهم
      می‌باشد.
    </p>
    <hr class="p-color" />
    <div dir="rtl" class="mt-5 w-color mb-5">
      <h3>آموزش ها</h3>

      <div class="row row-cols-1 row-cols-md-2 g-4 mt-1">
        <div class="col">
          <div class="card">
            <video class="card-img-top" controls>
              <source
                src="https://raw.githubusercontent.com/bit-orbit/CDN/refs/heads/master/files/documents/add.mp4"
                type="video/mp4"
              />
            </video>
            <div class="card-body">
              <h5 class="card-title">اضافه کردن یک سهم به واچ لیست</h5>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card">
            <video class="card-img-top" controls>
              <source
                src="https://raw.githubusercontent.com/bit-orbit/CDN/refs/heads/master/files/documents/addVol.mp4"
                type="video/mp4"
              />
            </video>
            <div class="card-body">
              <h5 class="card-title">
                اضافه کردن سهم بر اساس حجم مشکوک ماهانه
              </h5>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card">
            <video class="card-img-top" controls>
              <source
                src="https://raw.githubusercontent.com/bit-orbit/CDN/refs/heads/master/files/documents/edit.mp4"
                type="video/mp4"
              />
            </video>
            <div class="card-body">
              <h5 class="card-title">ویرایش یک سهم از واچ لیست</h5>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card">
            <video class="card-img-top" controls>
              <source
                src="https://raw.githubusercontent.com/bit-orbit/CDN/refs/heads/master/files/documents/notiftel.mp4"
                type="video/mp4"
              />
            </video>
            <div class="card-body">
              <h5 class="card-title">اتصال به تلگرام برای دریافت اخطار‌ها</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>
