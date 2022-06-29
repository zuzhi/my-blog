(ns cryogen.core
  (:require [cryogen-core.compiler :refer [compile-assets-timed]]
            [cryogen-core.plugins :refer [load-plugins]]))

(defn -main []
  (load-plugins)
  (compile-assets-timed
   {:update-article-fn
    (do
      (fn update-article [{:keys [slug] :as article} config]
        (if slug
          (assoc article
                 :uri (str "/" slug ".html"))
          article))
      (fn exclude-article [{:keys [hide] :as article} config]
        (if hide
          nil
          article)))})
  (System/exit 0))
