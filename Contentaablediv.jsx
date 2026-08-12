"use client";

const Page = () => {
  return (
    <main className="min-h-[calc(100dvh-80px)] w-full overflow-hidden bg-[#f5f5f5]">

      <section className="mx-auto flex min-h-[calc(100dvh-80px)] w-full max-w-7xl flex-col items-center">

        {/* ================= HERO CONTENT ================= */}

        <div className="flex w-full shrink-0 flex-col items-center px-4 pt-8 text-center md:pt-10">

          <p className="text-sm font-medium text-[#8f45a8] md:text-base">
            Application éducative d'excellence
          </p>

          <h1 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-medium leading-tight">
            Transformez Votre Avenir Avec
          </h1>

          <h2 className="text-[clamp(2.2rem,5vw,5rem)] font-bold leading-tight text-[#8f45a8]">
            IQRA Education
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600 md:text-base lg:text-lg">
            Réussir à l'école commence par un bon accompagnement.
            Apprenez mieux, progressez plus vite et choisissez votre avenir
            avec IQRA.
          </p>

          <button
            className="
              mt-6
              rounded-full
              border
              border-[#9b4bb5]
              px-10
              py-3
              text-base
              font-medium
              text-[#9b4bb5]
              transition
              hover:bg-[#9b4bb5]
              hover:text-white
              md:px-16
              md:py-4
              md:text-lg
            "
          >
            Télécharger l'app
          </button>

        </div>


        {/* ================= PHONE STAGE ================= */}

        <div className="relative mt-6 flex min-h-0 w-full flex-1 items-end justify-center overflow-hidden">

          {/* OUTER CIRCLE */}
          <div
            className="
              absolute
              bottom-[-60%]
              left-1/2
              aspect-square
              w-[95%]
              -translate-x-1/2
              rounded-full
              border
              border-gray-300
            "
          />

          {/* INNER CIRCLE */}
          <div
            className="
              absolute
              bottom-[-52%]
              left-1/2
              aspect-square
              w-[75%]
              -translate-x-1/2
              rounded-full
              border
              border-gray-300
            "
          />

          {/* COLORED HALF CIRCLE */}
          <div
            className="
              absolute
              bottom-[-48%]
              left-1/2
              aspect-square
              w-[67%]
              -translate-x-1/2
              rounded-full
              bg-gradient-to-r
              from-[#f4df55]
              via-[#d5a5bd]
              to-[#a96db6]
            "
          />

          {/* LEFT FLOATING CARD */}
          <div
            className="
              absolute
              left-[2%]
              top-[10%]
              z-30
              hidden
              w-[300px]
              rounded-xl
              bg-white
              p-3
              shadow-sm
              md:block
              lg:w-[360px]
            "
          >
            <div className="flex gap-3">

              <div className="h-14 w-24 shrink-0 rounded-lg bg-gray-200" />

              <div>
                <span className="rounded-full bg-green-500 px-3 py-1 text-[10px] font-bold text-white">
                  SVT
                </span>

                <p className="mt-1 text-sm font-semibold leading-4 text-gray-700">
                  Le rôle des chromosomes dans la transmission de
                  l'information génétique
                </p>
              </div>

            </div>

            <div className="mt-3 h-1 rounded-full bg-gray-200">
              <div className="h-full w-[85%] rounded-full bg-yellow-400" />
            </div>

            <p className="mt-1 text-[10px] text-gray-400">
              Progrès : 85%
            </p>
          </div>


          {/* RIGHT FLOATING CARD */}
          <div
            className="
              absolute
              right-[2%]
              top-[15%]
              z-30
              hidden
              w-[300px]
              rounded-xl
              border
              border-yellow-300
              bg-white
              p-4
              shadow-sm
              md:block
              lg:w-[360px]
            "
          >
            <p className="text-sm font-semibold text-gray-700">
              Course : Propagation d'onde lumineuse
            </p>

            <p className="mt-1 text-xs text-gray-400">
              15 min
            </p>
          </div>


          {/* PHONE */}
          <img
            src="https://www.iqra.ma/_next/image?url=%2FimageComponents%2FmainPhone.webp&w=2048&q=75"
            alt="IQRA Education application"
            className="
              relative
              z-20
              h-auto
              max-h-full
              w-[220px]
              object-contain
              sm:w-[250px]
              md:w-[290px]
              lg:w-[340px]
            "
          />

        </div>

      </section>

    </main>
  );
};

export default Page;