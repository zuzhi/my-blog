(ns cryogen.core
  (:require [cryogen-core.compiler :refer [compile-assets-timed]]
            [cryogen-core.plugins :refer [load-plugins]]))

(defn update-article [{:keys [hide slug] :as article} config]
  (if hide
    nil
    (if slug
      (assoc article
             :uri (str "/" slug ".html"))
      article)))

(defn -main []
  (load-plugins)
  (compile-assets-timed
   {:update-article-fn
    update-article})
  (System/exit 0))
