export function Filter({UpdateFilterAge, updateFilterSize, updateFilterGender, updateFilters}) {
    return (
        <form className="filter">
            <div className="filter__group">
                <p>Age</p>
                <div className="filter__container">
                    <div className="filter__field">
                        <input type="checkbox" id="age-baby" name="age-baby" value="baby" defaultChecked  onChange={UpdateFilterAge} />
                        <label htmlFor="age-baby">Puppy</label>
                    </div>
                    <div className="filter__field">
                        <input type="checkbox" id="age-young" name="age-young" value="young" defaultChecked onChange={UpdateFilterAge} />
                        <label htmlFor="age-baby">Young</label>
                    </div>
                    <div className="filter__field">
                        <input type="checkbox" id="age-adult" name="age-adult" value="adult" defaultChecked onChange={UpdateFilterAge} />
                        <label htmlFor="age-adult">Adult</label>
                    </div>
                    <div className="filter__field">
                        <input type="checkbox" id="age-senior" name="age-senior" value="senior" defaultChecked onChange={UpdateFilterAge} />
                        <label htmlFor="age-baby">Senior</label>
                    </div>
                </div>
            </div>
            <div className="filter__group">
                <p>Size</p>
                <div className="filter__container">
                    <div className="filter__field">
                        <input type="checkbox" id="size-small" name="size-small" value="small" defaultChecked onChange={updateFilterSize} />
                        <label htmlFor="size-small">Small</label>
                    </div>
                    <div className="filter__field">
                        <input type="checkbox" id="size-medium" name="size-medium" value="medium" defaultChecked onChange={updateFilterSize} />
                        <label htmlFor="size-small">Medium</label>
                    </div>
                    <div className="filter__field">
                        <input type="checkbox" id="size-large" name="size-large" value="large" defaultChecked onChange={updateFilterSize} />
                        <label htmlFor="size-large">Large</label>
                    </div>
                    <div className="filter__field">
                        <input type="checkbox" id="size-xlarge" name="size-xlarge" value="xlarge" defaultChecked onChange={updateFilterSize} />
                        <label htmlFor="size-xlarge">XLarge</label>
                    </div>
                </div>
            </div>
            <div className="filter__group">
                <p>Gender</p>
                <div className="filter__container">
                    <div className="filter__field">
                        <input type="checkbox" id="gender-male" name="gender-male" value="male" defaultChecked onChange={updateFilterGender} />
                        <label htmlFor="size-large">Male</label>
                    </div>
                    <div className="filter__field">
                        <input type="checkbox" id="gender-female" name="gender-female" value="female" defaultChecked onChange={updateFilterGender} />
                        <label htmlFor="size-large">Female</label>
                    </div>
                </div>
            </div>
            <div className="filter__submit">
                <button type="submit" onClick={updateFilters}>Filter</button>
            </div>
        </form>
    );
}
