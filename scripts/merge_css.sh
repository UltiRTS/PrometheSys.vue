all_css=$(ls dist/renderer/*.css)
index_css=$(ls dist/renderer/index*.css)

for css in $all_css; do
    echo $css
    cat $css >> dist/renderer/all.css
done

#mv dist/renderer/all.css $index_css
